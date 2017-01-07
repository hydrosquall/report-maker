import Ember from 'ember';

export default Ember.Component.extend({
  didRender: function () {
    Ember.Logger.info('didRender');
    if (this.get('showModal')) {
      Ember.$('#myModal').modal('show');
    } else {
      Ember.$('#myModal').modal('hide');
    }
  },

  actions: {
    cancel () {
      Ember.Logger.info('Cancel has been used');
      this.get('onRemove')();
    },

    save () {
      Ember.Logger.info('Save has been used');
      this.get('onRemove')();
    }
  }
});
