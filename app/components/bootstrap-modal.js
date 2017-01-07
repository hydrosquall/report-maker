import Ember from 'ember';

export default Ember.Component.extend({
  compX: undefined,
  compY: undefined,
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
      let saveObj = {graph: selectValue, x: this.get('compX'), y: this.get('compY')};
      this.get('onSave')(saveObj);
    }
  }
});
