// app/components/bar-chart.js
/* global d3 */

import Ember from 'ember';

export default Ember.Component.extend({
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
      margin,
      this.factorWidth(args.width || this.defaultWidth, margin),
      this.factorHeight(args.height || this.defaultHeight, margin),
      chartModel,
      Ember.A([args.x, args.y])
    );
  },

  drawChart (m, w, h, cm, pos) {
    this._super(...arguments);
    let margin = m;
    let width = w;
    let height = h;
    let chartModel = cm;
    let xy = pos;
    let chartClass = '.' + this.get('barChartClass');

    d3.select(chartClass).innerHTML = undefined;

    let x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    let y = d3.scaleLinear()
      .range([height, 0]);

    let svg = d3.select(chartClass).append('svg')
      .attr('id', this.get('barChartClass'))
      .attr('class', 'bar-graph')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .on('contextmenu', () => { this.rightClick(d3.event); })
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

    Ember.$(chartClass).css({top: xy[1], left: xy[0], position: 'absolute'});

    Ember.$(chartClass).draggable({
      stop: function (event, ui) {
        let os = ui.offset;
        Ember.$(chartClass).css({top: os.top, left: os.left, position: 'absolute'});
      },
      snap: true,
      grid: [5, 5]
    });

    const _this = this;
    Ember.$(chartClass).resizable({
      resize: function (event, ui) {
        Ember.$('#' + _this.get('barChartClass')).remove();
        _this.drawChart(
          m,
          ui.size.width - m.left - m.right,
          ui.size.height - m.top - m.bottom,
          chartModel,
          Ember.A([ui.position.left, ui.position.top])
        );
      }
    });
  },

  factorHeight (h, m) {
    return h - m.top - m.bottom;
  },

  factorWidth (w, m) {
    return w - m.left - m.right;
  },

  rightClick (evt) {
    this.get('graphRightClicked')(evt, {type: 'edit', name: this.get('barChartClass')});
  }
});
