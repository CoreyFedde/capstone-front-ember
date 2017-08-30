import Ember from 'ember';

export default Ember.Component.extend({
  selectedLoan: {
    value: null,
  },
  actions: {
    createLoan(newLoan){
      return this.sendAction('createLoan', newLoan)
      // console.log(this.get('loan'))
    },
    selectLoan(loan) {
      this.set('selectedLoan.value', loan)
      return this.sendAction('selectLoan', this.get('selectedLoan'))
      console.log('did anything')
      console.log('loan param', loan)
      console.log('object', this.get('selectedLoan.value'))
    },
  },
});
