import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateLoan() {
      this.sendAction('updateLoan', this.get('loan'));
    }
  }
});
