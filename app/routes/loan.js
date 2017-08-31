import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('loan', params.loan_id)
  },
  actions: {
    createLoan(loan) {
      let newLoan = this.get('store').createRecord('loan', loan)
      newLoan.save()
    },
    deleteLoan(loan) {
      loan.destroyRecord()
    }
  }
});
