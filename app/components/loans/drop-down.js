import Ember from 'ember';

export default Ember.Component.extend({
  selectedLoan: null,
  actions: {
    createLoan(newLoan){
      return this.sendAction('createLoan', newLoan)
    },
    selectLoan(loan) {
      this.set('selectedLoan', loan)
      return this.sendAction('selectLoan', this.get('selectedLoan'))
    },
    deleteLoan(loan){
      return this.sendAction('deleteLoan', this.get('loan'))
    }
  },
});
