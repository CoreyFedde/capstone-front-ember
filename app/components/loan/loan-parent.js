import Ember from 'ember';

export default Ember.Component.extend({
  selectedTool: null,
  actions: {
    createLoan(newLoan){
      return this.sendAction('createLoan', newLoan);
    },
    deleteLoan(loan){
      // console.log(loan)
      return this.sendAction('deleteLoan', loan);
      // console.log(this.get('loan'))
    },
    selectTool(selecttool) {
      this.set('selectedTool', selecttool);
    }
  }
});
