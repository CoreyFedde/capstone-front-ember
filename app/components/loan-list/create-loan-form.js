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
      this.sendAction('createLoan', this.get('newLoan'));
      this.set("newLoan.name", null);
      this.set("newLoan.lender", null);
      this.set("newLoan.principal", null);
      this.set("newLoan.interest_rate", null);
      this.set("newLoan.loan_length", null);
    },
    reset () {
      this.set("newLoan.name", null);
      this.set("newLoan.lender", null);
      this.set("newLoan.principal", null);
      this.set("newLoan.interest_rate", null);
      this.set("newLoan.loan_length", null);
    },
  },
});
