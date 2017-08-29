import Ember from 'ember';

export default Ember.Component.extend({
  newLoan: {
    name: null
  },
  actions: {
    createLoan(){
      return this.sendAction('createLoan', this.get('newLoan'))
      this.set("newLoan.name", null);
      // console.log(this.get('loan'))
    }
  },
});
