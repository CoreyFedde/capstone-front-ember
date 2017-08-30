import Ember from 'ember';

export default Ember.Component.extend({
  selectedTool: {
    value: null,
  },
  actions: {
    selectTool(tool) {
      this.set('selectedTool.value', tool)
      return this.sendAction('selectTool', this.get('selectedTool'))
    },
  },
});
