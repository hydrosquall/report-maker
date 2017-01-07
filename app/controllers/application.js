import Ember from 'ember';

export default Ember.Controller.extend({
  showModal: false,
  noClick: false,
  offsetX: undefined,
  offsetY: undefined,
  components: Ember.A(),
  renderGraph (paramsObj) {
    paramsObj['model'] = this.get('model');
    this.get('components').pushObject(paramsObj);
    Ember.Logger.info('COMPONENTS ::', this.get('components'));
  },

  renderModal (x, y) {
    this.set('offsetX', x || 0);
    this.set('offsetY', y || 0);
    this.set('showModal', true);
  },

  actions: {
    createGraph (paramsObj) {
      this.set('showModal', false);
      this.renderGraph(paramsObj);
    },

    menuModal (evt) {
      if (evt.button === 2 && !this.get('showModal') && !this.get('noClick')) {
        this.renderModal(evt.offsetX, evt.offsetY);
      }

      if (this.get('noClick')) {
        this.set('noClick', false);
      }
    },

    noClick () {
      this.set('noClick', true);
    },

    removeModal () {
      this.set('showModal', false);
    }
  }
});
