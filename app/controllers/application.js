import Ember from 'ember';

export default Ember.Controller.extend({
  renderModal (x, y) {
    Ember.Logger.info(x, y);
  },

  actions: {
    menuModal (evt) {
      if (evt.button === 2) {
        this.renderModal(evt.offsetX, evt.offsetY);
      }
    }
  }
});
