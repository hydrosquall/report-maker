// app/mixins/d3-init.js
/* global d3 */

import Ember from 'ember';

export default Ember.Mixin.create({
  d3Init (ele, svgId, svgClass, width, height, margins, rc) {
    return d3.select(ele).append('svg')
      .attr('id', svgId)
      .attr('class', svgClass)
      .attr('width', width + margins.right + margins.left)
      .attr('height', height + margins.top + margins.bottom)
      .on('contextmenu', () => { rc(d3.event, { type: 'edit', name: svgId }); })
      .append('g')
      .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
  }
});
