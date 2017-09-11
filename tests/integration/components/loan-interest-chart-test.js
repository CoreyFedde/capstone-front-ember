import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('loan-interest-chart', 'Integration | Component | loan interest chart', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{loan-interest-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#loan-interest-chart}}
      template block text
    {{/loan-interest-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
