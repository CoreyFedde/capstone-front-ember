import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteLoan(){
      return this.sendAction('deleteLoan', this.get('loan'));
      // console.log(this.get('loan'))
    }
  },
});
