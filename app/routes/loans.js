import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),
  model () {
    return this.get('store').findAll('loan');
  },
  actions: {
    willTransition() {
      console.log('did transition')
      this.set('newLoan', {})
    },
    createLoan(loan) {
      let newestLoan = this.get('store').createRecord('loan', loan);
      newestLoan.save()
      .then(() => {
        this.get('flashMessages')
        .success('Successfully created a loan!');
      })
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
        newLoan.destroyRecord()
      });
    },
    deleteLoan(loan) {
      loan.destroyRecord()
        .then(() => {
          this.get('flashMessages')
          .success('Successfully created a loan!');
        })
        .catch(() => {
          this.get('flashMessages')
          .danger('There was a problem. Please try again.');
        });
    }
  }
});
