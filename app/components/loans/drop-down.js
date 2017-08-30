import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  // selectedLoan: null,
  actions: {
    createLoan(newLoan){
      return this.sendAction('createLoan', newLoan)
    },
    selectLoan(loanId) {
      let loan = ""
      if (loanId !== "new-loan") {
        loan = this.get('store').peekRecord('loan', loanId)
      } else {
        loan = loanId
      }
      console.log('Type is', typeof loan)
      console.log('loan is', loan)
      // console.log(loan)
      // return this.sendAction('fuckyLoan2', this.get('selectedLoan'))
      return this.sendAction('selectLoan', loan)
      // return this.sendAction('selectLoan', this.get('selectedLoan'))
    },
    deleteLoan(loan){
      return this.sendAction('deleteLoan', this.get('loan'))
    }
  },
});
