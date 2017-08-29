import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('loan');
  },
  actions: {
    createLoan(loan) {
      let newLoan = this.get('store').createRecord('loan', loan)
      newLoan.save()
    },
    deleteLoan(loan) {
      // console.log(loan)
      loan.destroyRecord()
    }
  }
});
