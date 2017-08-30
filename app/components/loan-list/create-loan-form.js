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
      return this.sendAction('createLoan', this.get('newLoan'))
      this.set("newLoan.name", null);
      // console.log(this.get('loan'))
    }
  },
});
