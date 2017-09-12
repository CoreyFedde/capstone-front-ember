import Ember from 'ember';

export default Ember.Component.extend({
  // selectedLoan: null,
  // selectedTool: null,
  selectedGraph: null,
  actions: {
    createLoan(newestLoan){
      return this.sendAction('createLoan', newestLoan);
    },
    deleteLoan(loan){
      return this.sendAction('deleteLoan', loan);
    },
    // selectLoan(selectloan) {
    //   this.set('selectedLoan', selectloan);
    //   // console.log(this.get('selectedLoan'))
    // },
    // selectTool(selecttool) {
    //   this.set('selectedTool', selecttool);
    // },
    selectBarGraph(selectGraph) {
      this.set('selectedGraph', selectGraph);
    }
  }
});
