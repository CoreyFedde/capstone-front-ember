import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('loan-list/create-loan-form', 'Integration | Component | loan list/create loan form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{loan-list/create-loan-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#loan-list/create-loan-form}}
      template block text
    {{/loan-list/create-loan-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
