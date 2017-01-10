// app/mixins/d3-init.js
/* global d3 */

import Ember from 'ember';

export default Ember.Mixin.create({
  attachListeners (_this, eleId, eleClass, marginObj, model, cb) {
    Ember.$(eleClass).draggable({
      stop: function (event, ui) {
        let os = ui.offset;
        Ember.$(eleClass).css({top: os.top, left: os.left, position: 'absolute'});
      },
      snap: true,
      grid: [5, 5]
    });

    Ember.$(eleClass).resizable({
      resize: function (event, ui) {
        let t = _this;
        Ember.$(eleId).remove();
        cb(
          t,
          marginObj,
          ui.size.width - marginObj.left - marginObj.right,
          ui.size.height - marginObj.top - marginObj.bottom,
          model,
          Ember.A([ui.position.left, ui.position.top])
        );
      }
    });
  },

  buildAxes (svgObj, height, x, y) {
    svgObj.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svgObj.append('g')
      .call(d3.axisLeft(y));
  },

  svgInit (ele, svgId, svgClass, width, height, margins, rc) {
    return d3.select(ele).append('svg')
      .attr('id', svgId)
      .attr('class', svgClass)
      .attr('width', width + margins.right + margins.left)
      .attr('height', height + margins.top + margins.bottom)
      .on('contextmenu', () => { rc(d3.event, { type: 'edit', name: svgId }); })
      .append('g')
      .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
  },

  removeSvg (d3Class) {
    d3.select(d3Class).innerHTML = undefined;
  }
});
