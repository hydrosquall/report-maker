import Ember from 'ember';

export default Ember.Component.extend({
  width: 280,
  height: 125,
  headerTitle: undefined,
  showCreate: false,
  showEdit: false,
  px: undefined,
  py: undefined,
  components: Ember.A([
    {label: 'Bar Chart', value: 'bar-chart'},
    {label: 'Line Chart', value: 'line-chart'}
  ]),
  didRender: function () {
    if (this.get('showModal')) {
      let params = this.get('modalParams');
      if (params.type === 'create') {
        this.set('px', params.x);
        this.set('py', params.y);
        this.set('showCreate', true);
      } else {
        this.set('showEdit', true);
      }
      this.set('headerTitle', params.name ? 'Edit Graph: ' + params.name : 'Create Graph');
      Ember.$('#myModal').modal('show');
    } else {
      Ember.$('#myModal').modal('hide');
    }
  },

  resetShows (showOptions) {
    let _this = this;
    showOptions.map((option) => {
      _this.set(option, !this.get(option) || false);
    });
  },

  actions: {
    cancel () {
      this.resetShows(['showCreate', 'showEdit']);
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
      this.resetShows(['showCreate', 'showEdit']);
      this.get('onSave')(saveObj);
    },

    deleteGraph () {
      this.resetShows(['showCreate', 'showEdit']);
      this.get('onDelete')(this.get('modalParams').name);
    }
  }
});
