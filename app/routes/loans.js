import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),
  model () {
    const allLoans = this.get('store').findAll('loan')
    let principalArray = []
    let interestArray = []
    let lengthArray = []
    let nameArray = []
    return allLoans.then(function(loan) {
      const allLoansArray = loan.toArray()
      for (let i = 0; i < allLoansArray.length; i++) {
        let principalValue = allLoansArray[i].get('principal')
        let interestValue = allLoansArray[i].get('interest_rate')
        let lengthValue = allLoansArray[i].get('loan_length')
        let name = allLoansArray[i].get('name')
        principalArray.push(principalValue)
        interestArray.push(interestValue)
        lengthArray.push(lengthValue)
        nameArray.push(name)
      }
      console.log(principalArray)
      console.log(interestArray)
      console.log(lengthArray)
      return {
      loansModel: allLoans,
      principalChart: {
        labels: nameArray,
        datasets: [{
          label: "Principal",
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          data: principalArray,
      }]
      },
      interestChart: {
        labels: nameArray,
        datasets: [{
          label: "Interest Rate",
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          data: interestArray,
      }]
      },
      lengthChart: {
        labels: nameArray,
        datasets: [{
          label: "Length",
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          data: lengthArray,
      }]
    },
  }
})
},
  actions: {
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
        newestLoan.destroyRecord()
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
