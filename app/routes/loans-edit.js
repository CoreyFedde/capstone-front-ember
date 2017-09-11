import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    updateLoan(loan){
      loan.save()
      .then((loan) => {
        console.log(loan)
        this.transitionTo('loan', loan.id);
      })
      .then(() => {
        this.get('flashMessages')
        .success('Successfully updated a loan!');
      })
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    }
  }
});
