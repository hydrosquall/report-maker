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
      this,
      this.defaultMargin,
      this.defaultWidth - this.defaultMargin.left - this.defaultMargin.right,
      this.defaultHeight - this.defaultMargin.top - this.defaultMargin.bottom,
      args.model.line,
      Ember.A([args.x, args.y])
    );
  },

  drawChart (_this, m, w, h, cm, pos) {
    let lineClass = '.' + _this.get('lineChartClass');
    let x = d3.scaleTime().range([0, w]);
    let y = d3.scaleLinear().range([h, 0]);

    let valueLine = d3.line()
      .x(d => { return x(_this.parseTime(d.date)); })
      .y(d => { return y(d.close); });

    let svg = _this.svgInit(lineClass, _this.get('lineChartClass'), 'line-graph', w, h, m, _this.get('graphRightClicked'));

    x.domain(d3.extent(cm, d => { return _this.parseTime(d.date); }));
    y.domain([0, d3.max(cm, d => { return d.close; })]);

    svg.append('path')
      .data([cm])
      .attr('class', 'line')
      .attr('d', valueLine);

    _this.buildAxes(svg, h, x, y);

    Ember.$(lineClass).css({top: pos[1], left: pos[0], position: 'absolute'});
    _this.attachListeners(_this, '#' + _this.get('lineChartClass'), lineClass, m, cm, _this.drawChart);
  }
});
