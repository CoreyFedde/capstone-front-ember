import Ember from 'ember';

// The create loan form fields change the value of an object I have named newLoan,
// this object is then passed up and has a record created on it
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
    // The reset button puts all attributes of the newLoan object to null
    reset () {
      this.set("newLoan.name", null);
      this.set("newLoan.lender", null);
      this.set("newLoan.principal", null);
      this.set("newLoan.interest_rate", null);
      this.set("newLoan.loan_length", null);
    },
  },
});
