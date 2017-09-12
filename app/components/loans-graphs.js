import Ember from 'ember';

// This action is called by clicking on the tabs of in the template
// The click sets an object to the event.target
// We then go through the new object and grab the id and set the value of the
// selectedGraph object to the id valud.
// There is an if statement in the template that is then waiting for the ID value
// to dicate which graph to display
export default Ember.Component.extend({
  graph: null,
  selectedGraph: "principal",
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
