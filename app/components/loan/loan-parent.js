import Ember from 'ember';

// Sends the data for the delete and create action up
// The selectTool would set an object to match the value of the data passed up
export default Ember.Component.extend({
  selectedTool: null,
  actions: {
    createLoan(newLoan){
      return this.sendAction('createLoan', newLoan);
    },
    deleteLoan(loan){
      return this.sendAction('deleteLoan', loan);
    },
    selectTool(selecttool) {
      this.set('selectedTool', selecttool);
    }
  }
});
