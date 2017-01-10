import Ember from 'ember';
import D3InitMixin from 'd3-components/mixins/d3-init';
import { module, test } from 'qunit';

module('Unit | Mixin | d3 init');

// Replace this with your real tests.
test('it works', function(assert) {
  let D3InitObject = Ember.Object.extend(D3InitMixin);
  let subject = D3InitObject.create();
  assert.ok(subject);
});
