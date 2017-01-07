import Ember from 'ember';

export default Ember.Component.extend({
  compX: undefined,
  compY: undefined,
  width: 280,
  height: 125,
  components: Ember.A([{label: 'Bar Chart', value: 'bar-chart'}]),
  didRender: function () {
    if (this.get('showModal')) {
      this.set('compX', this.get('componentX'));
      this.set('compY', this.get('componentY'));
      Ember.$('#myModal').modal('show');
    } else {
      Ember.$('#myModal').modal('hide');
    }
  },

  actions: {
    cancel () {
      this.get('onRemove')();
    },

    save () {
      let selectValue = Ember.$('#graph-select')[0].value;
      let xValue = Ember.$('#x-pos')[0].value;
      let yValue = Ember.$('#y-pos')[0].value;
      let h = Ember.$('#graph-height')[0].value;
      let w = Ember.$('#graph-width')[0].value;

      let saveObj = {
        graph: selectValue,
        x: Number(xValue) || Number(this.get('compX')),
        y: Number(yValue) || Number(this.get('compY')),
        width: Number(w) || Number(this.get('width')),
        height: Number(h) || Number(this.get('height'))
      };
      this.get('onSave')(saveObj);
    },

    updateX (x, y) {
      Ember.Logger.info(x);
    }
  }
});
