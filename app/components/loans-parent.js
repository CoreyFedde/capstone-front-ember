import Ember from 'ember';

export default Ember.Component.extend({
  selectedLoan: null,
  selectedTool: null,
  loanId: function() {
    return selectedLoan.slice(-2);
  },
  actions: {
    createLoan(newLoan){
      return this.sendAction('createLoan', newLoan)
    },
    deleteLoan(loan){
      console.log(loan)
      return this.sendAction('deleteLoan', loan)
      // console.log(this.get('loan'))
    },
    selectLoan(selectloan) {
      this.set('selectedLoan', selectloan)
      console.log(this.get('selectedLoan'))
    },
    selectTool(selecttool) {
      this.set('selectedTool', selecttool.value)
    }
  }
});
