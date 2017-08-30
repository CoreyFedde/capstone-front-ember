import Ember from 'ember';

export default Ember.Component.extend({
  selectedLoan: null,
  selectedTool: null,
  actions: {
    createLoan(newLoan){
      return this.sendAction('createLoan', newLoan)
    },
    deleteLoan(){
      return this.sendAction('deleteLoan', this.get('loan'))
      // console.log(this.get('loan'))
    },
    selectLoan(selectloan) {
      this.set('selectedLoan', selectloan)
    },
    selectTool(selecttool) {
      this.set('selectedTool', selecttool.value)
    }
  }
});
