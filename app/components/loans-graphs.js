import Ember from 'ember';

export default Ember.Component.extend({
  graph: null,
  selectedGraph: null,
  actions: {
    selectBarGraph() {
      // let tool = this.get('store').peekRecord('tool', toolId)
      // console.log(selectedGraph)
      // console.log(selectedGraph.value)
      this.set('graph', event.target);
      this.set('selectedGraph', this.get('graph').id)
      // console.log(this.get('graph').id)
      return this.sendAction('selectGraph', this.get('selectedGraph'));
    },
  },
});
