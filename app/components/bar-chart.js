// app/components/bar-chart.js
/* global d3 */

import Ember from 'ember';

export default Ember.Component.extend({
  defaultMargin: {top: 20, right: 20, bottom: 30, left: 40},
  defaultHeight: 125,
  defaultWidth: 240,

  didRender () {
    let args = this.get('args');
    let margin = args.margins || this.defaultMargin;
    let chartModel = args.model || Ember.A([]);
    this.drawChart(
      margin,
      this.factorWidth(args.width || this.defaultWidth, margin),
      this.factorHeight(args.height || this.defaultHeight, margin),
      chartModel,
      Ember.A([args.x, args.y])
    );
  },

  drawChart (m, w, h, cm, pos) {
    this._super(...arguments);
    let margin = arguments[0];
    let width = arguments[1];
    let height = arguments[2];
    let chartModel = arguments[3];
    let xy = arguments[4];

    d3.select('.bar-chart').innerHTML = undefined;

    let x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    let y = d3.scaleLinear()
      .range([height, 0]);

    let svg = d3.select('.bar-chart').append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('x', 100)
      .attr('y', 100)
      .on('contextmenu', () => { this.stopRightClick(); })
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(chartModel.map(d => { return d.name; }));
    y.domain([0, d3.max(chartModel, d => { return d.sales; })]);

    svg.selectAll('.bar')
      .data(chartModel)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => { return x(d.name); })
      .attr('width', x.bandwidth())
      .attr('y', d => { return y(d.sales); })
      .attr('height', d => { return height - y(d.sales); });

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    Ember.Logger.info(xy);
    Ember.$('.bar-chart').css({top: xy[1], left: xy[0], position: 'absolute'});
  },

  factorHeight (h, m) {
    return h - m.top - m.bottom;
  },

  factorWidth (w, m) {
    return w - m.left - m.right;
  },

  stopRightClick () {
    this.get('noClick')();
    Ember.Logger.info('Right click stopped');
  }
});
