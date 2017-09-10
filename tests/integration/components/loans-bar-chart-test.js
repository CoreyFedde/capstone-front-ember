import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('loans-bar-chart', 'Integration | Component | loans bar chart', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{loans-bar-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#loans-bar-chart}}
      template block text
    {{/loans-bar-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
