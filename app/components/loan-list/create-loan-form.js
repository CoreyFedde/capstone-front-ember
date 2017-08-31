import Ember from 'ember';

export default Ember.Component.extend({
  newLoan: {
    name: null,
    lender: null,
    principal: null,
    interest_rate: null,
    loan_length: null
  },
  actions: {
    createLoan(){
      // console.log(this.get('newLoan'))
      this.sendAction('createLoan', this.get('newLoan'));
      this.set('newLoan', {});
      // this.set("newLoan", null);
      // this.set("newLoan.lender", null);
      // this.set("newLoan.principal", null);
      // this.set("newLoan.interest_rate", null);
      // this.set("newLoan.loan_length", null);
      // console.log(this.get('loan'))
    },
    reset () {
      this.set('newLoan', {});
    },
  },
});
