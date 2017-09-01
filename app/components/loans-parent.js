import Ember from 'ember';

export default Ember.Component.extend({
  selectedLoan: null,
  selectedTool: null,
  actions: {
    createLoan(newestLoan){
      return this.sendAction('createLoan', newestLoan);
    },
    deleteLoan(loan){
      // console.log(loan)
      return this.sendAction('deleteLoan', loan);
      // console.log(this.get('loan'))
    },
    selectLoan(selectloan) {
      this.set('selectedLoan', selectloan);
      // console.log(this.get('selectedLoan'))
    },
    selectTool(selecttool) {
      this.set('selectedTool', selecttool);
    }
  }
});
