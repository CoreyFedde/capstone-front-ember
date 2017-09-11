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
      return {
      loansModel: allLoans,
      principalChart: {
        labels: nameArray,
        datasets: [{
          label: "Principal",
          backgroundColor: 'rgba(100, 81, 136, .7)',
          data: principalArray,
      }],
      },
      interestChart: {
        labels: nameArray,
        datasets: [{
          label: "Interest Rate",
          backgroundColor: 'rgba(136, 100, 81, .7)',
          data: interestArray,
      }]
      },
      lengthChart: {
        labels: nameArray,
        datasets: [{
          label: "Length",
          backgroundColor: 'rgba(136, 81, 89, .7)',
          data: lengthArray,
      }]
    },
    barOptions: {
        scales: {
            xAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            }]
        }
    }
  }
})
},
  actions: {
    createLoan(loan) {
      let newestLoan = this.get('store').createRecord('loan', loan);
      newestLoan.save()
      .then((loan) => {
        this.transitionTo('loan', loan.id);
      })
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
