// app/components/bar-chart.js
/* global d3 */

import Ember from 'ember';
import D3Init from '../mixins/d3-init';

export default Ember.Component.extend(D3Init, {
  defaultMargin: {top: 20, right: 20, bottom: 30, left: 40},
  defaultHeight: 125,
  defaultWidth: 240,
  barChartClass: undefined,
  barColor: 'red',

  didRender () {
    let args = this.get('args');
    this.set('barChartClass', args.name);
    let margin = args.margins || this.defaultMargin;
    let chartModel = args.model.bar || Ember.A([]);
    this.drawChart(
      this,
      margin,
      this.factorWidth(args.width || this.defaultWidth, margin),
      this.factorHeight(args.height || this.defaultHeight, margin),
      chartModel,
      Ember.A([args.x, args.y])
    );
  },

  drawChart (_this, m, w, h, cm, pos) {
    let chartClass = '.' + _this.get('barChartClass');

    _this.removeSvg(chartClass);

    let x = d3.scaleBand()
      .range([0, w])
      .padding(0.1);
    x.domain(cm.map(d => { return d.name; }));

    let y = d3.scaleLinear()
      .range([h, 0]);
    y.domain([0, d3.max(cm, d => { return d.sales; })]);

    let svg = _this.svgInit(chartClass, _this.get('barChartClass'), 'bar-graph', w, h, m, _this.get('graphRightClicked'));

    svg.selectAll('.bar')
      .data(cm)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => { return x(d.name); })
      .attr('width', x.bandwidth())
      .attr('y', d => { return y(d.sales); })
      .attr('height', d => { return h - y(d.sales); });

    _this.buildAxes(svg, h, x, y);

    Ember.$(chartClass).css({top: pos[1], left: pos[0], position: 'absolute'});

    _this.attachListeners(_this, '#' + _this.get('barChartClass'), chartClass, m, cm, _this.drawChart);
  },

  factorHeight (h, m) {
    return h - m.top - m.bottom;
  },

  factorWidth (w, m) {
    return w - m.left - m.right;
  }
});
