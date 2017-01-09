// app/components/line-chart.js
/* global d3 */

import Ember from 'ember';
import D3Init from '../mixins/d3-init';

export default Ember.Component.extend(D3Init, {
  defaultMargin: {top: 20, right: 20, bottom: 30, left: 50},
  defaultWidth: 280,
  defaultHeight: 125,
  parseTime: d3.timeParse('%d-%b-%y'),
  lineChartClass: undefined,
  didRender () {
    let args = this.get('args');
    this.set('lineChartClass', args.name);
    this.drawChart(
      this.defaultMargin,
      this.defaultWidth - this.defaultMargin.left - this.defaultMargin.right,
      this.defaultHeight - this.defaultMargin.top - this.defaultMargin.bottom,
      args.model.line,
      Ember.A([args.x, args.y])
    );
  },

  drawChart (m, w, h, cm, pos) {
    this._super(...arguments);
    let lineClass = '.' + this.get('lineChartClass');
    let x = d3.scaleTime().range([0, w]);
    let y = d3.scaleLinear().range([h, 0]);

    let valueLine = d3.line()
      .x(d => { return x(this.parseTime(d.date)); })
      .y(d => { return y(d.close); });

    let svg = this.d3Init(lineClass, this.get('lineChartClass'), 'line-graph', w, h, m, this.get('graphRightClicked'));

    x.domain(d3.extent(cm, d => { return this.parseTime(d.date); }));
    y.domain([0, d3.max(cm, d => { return d.close; })]);

    svg.append('path')
      .data([cm])
      .attr('class', 'line')
      .attr('d', valueLine);

    svg.append('g')
      .attr('transform', 'translate(0,' + h + ')')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    Ember.$(lineClass).css({top: pos[1], left: pos[0], position: 'absolute'});

    Ember.$(lineClass).draggable({
      stop: function (event, ui) {
        let os = ui.offset;
        Ember.$(lineClass).css({top: os.top, left: os.left, position: 'absolute'});
      },
      snap: true,
      grid: [5, 5]
    });

    const _this = this;
    Ember.$(lineClass).resizable({
      resize: function (event, ui) {
        Ember.$('#' + _this.get('lineChartClass')).remove();
        _this.drawChart(
          m,
          ui.size.width - m.left - m.right,
          ui.size.height - m.top - m.bottom,
          cm,
          Ember.A([ui.position.left, ui.position.top])
        );
      }
    });
  },

  rightClick (evt) {
    this.get('graphRightClicked')(evt, {type: 'edit', name: this.get('lineChartClass')});
  }
});
