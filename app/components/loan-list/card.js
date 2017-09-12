import Ember from 'ember';

// Sends the data for the delete action up
export default Ember.Component.extend({
  actions: {
    deleteLoan(){
      return this.sendAction('deleteLoan', this.get('loan'));
    }
  },
});
