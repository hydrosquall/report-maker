import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    const m = [
      {name: 'bob', sales: 33},
      {name: 'Robin', sales: 12},
      {name: 'Anne', sales: 42}
    ];
    return m;
  }
});
