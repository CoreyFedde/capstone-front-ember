import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),
  model () {
    return this.get('store').findAll('loan');
  },
  actions: {
    createLoan(loan) {
      let newLoan = this.get('store').createRecord('loan', loan)
      newLoan.save()
      .then(() => {
        this.get('flashMessages')
        .success('Successfully created a loan!');
      })
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },
    deleteLoan(loan) {
      loan.destroyRecord()
        .then(() => {
          this.get('flashMessages')
          .success('Successfully deleted a loan!');
        })
        .catch(() => {
          this.get('flashMessages')
          .danger('There was a problem. Please try again.');
        });
    }
  }
});
