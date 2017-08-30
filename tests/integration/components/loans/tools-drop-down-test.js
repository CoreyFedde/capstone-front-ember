import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('loans/tools-drop-down', 'Integration | Component | loans/tools drop down', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{loans/tools-drop-down}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#loans/tools-drop-down}}
      template block text
    {{/loans/tools-drop-down}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
