import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    updateLoan(loan){
      loan.save()
      .then(() => {
        this.transitionTo('loans');
      })
    }
  }
});
