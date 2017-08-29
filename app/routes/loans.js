import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('loan');
  },
  actions: {

    deleteLoan(loan) {
      // console.log(loan)
      loan.destroyRecord()
    }
  }
});