import Ember from 'ember';

export default Ember.Component.extend({
  selectedTool: null,
  actions: {
    selectTool(toolId) {
      // let tool = this.get('store').peekRecord('tool', toolId)
      this.set('selectedTool', toolId)
      return this.sendAction('selectTool', this.get('selectedTool'))
    },
  },
});
