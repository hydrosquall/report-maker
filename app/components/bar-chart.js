// app/components/bar-chart.js

import Ember from 'ember';

export default Ember.Component.extend({
  defaultMargin: {top: 20, right: 20, bottom: 30, left: 40},
  defaultHeight: 500,
  defaultWidth: 960,
  /*
  didRender () {
    let margin = this.get('margin') || this.defaultMargin;
    let chartModel = this.get('model') || Ember.A;
    this.drawChart(
      margin,
      this.factorWidth(this.get('width') || this.defaultWidth, margin),
      this.factorHeight(this.get('height') || this.defaultHeight, margin),
      chartModel
    );
  },
  */
  drawChart (m, w, h, cm) {
    this._super(...arguments);
    let margin = arguments[0];
    let width = arguments[1];
    let height = arguments[2];
    let chartModel = arguments[3];

    d3.select('.bar-chart').innerHTML = undefined;

    let x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    let y = d3.scaleLinear()
      .range([height, 0]);

    let svg = d3.select('.bar-chart').append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
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
      .attr('y', d => { return  y(d.sales); })
      .attr('height', d => { return height - y(d.sales); });

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  },

  factorHeight(h, m) {
    return h - m.top - m.bottom;
  },

  factorWidth (w, m) {
    return w - m.left - m.right;
  }
});
