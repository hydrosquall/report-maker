import Ember from 'ember';

export default Ember.Controller.extend({
  components: Ember.A(),
  modalParams: undefined,
  showModal: false,
  buildNum: 0,

  renderGraph (paramsObj) {
    paramsObj['model'] = this.get('model');
    this.get('components').pushObject(paramsObj);
  },

  actions: {
    createGraph (paramsObj) {
      this.set('showModal', false);
      paramsObj['name'] = paramsObj.graph + '-' + this.get('buildNum');
      this.set('buildNum', this.get('buildNum') + 1);
      this.renderGraph(paramsObj);
    },

    deleteGraph (svgId) {
      this.set('showModal', false);
      let c = this.get('components');

      for (let i = 0; i < c.length; i++) {
        if (c[i].name === svgId) {
          let ele = c.splice(i, 1);
          let parentId = Ember.$('.' + ele[0].name).parents()[1].id;
          Ember.$('#' + parentId).remove();
          this.set('components', c);
          break;
        }
      }
    },

    menuModal (evt, params) {
      if (evt.button === 2 && !this.get('showModal')) {
        if (params) {
          params['event'] = evt;
          this.set('modalParams', params);
        } else {
          this.set('modalParams', {
            event: evt,
            name: undefined,
            type: 'create',
            x: evt.offsetX,
            y: evt.offsetY
          });
        }
        this.set('showModal', true);
      }
    },

    removeModal () {
      this.set('showModal', false);
    }
  }
});
