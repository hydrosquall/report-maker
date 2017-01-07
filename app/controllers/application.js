import Ember from 'ember';

export default Ember.Controller.extend({
  showModal: false,
  offsetX: undefined,
  offsetY: undefined,
  renderModal (x, y) {
    this.set('offsetX', x || 0);
    this.set('offsetY', y || 0);
    this.set('showModal', true);
    Ember.Logger.info(x, y);
  },

  actions: {
    menuModal (evt) {
      if (evt.button === 2) {
        this.renderModal(evt.offsetX, evt.offsetY);
      }
    },

    removeModal () {
      this.set('showModal', false);
    }
  }
});
