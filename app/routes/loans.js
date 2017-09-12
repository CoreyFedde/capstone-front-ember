import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),
  // Chart.js required a custom model to return objects and chart data
  model () {
    const allLoans = this.get('store').findAll('loan')
    let principalArray = []
    let interestArray = []
    let lengthArray = []
    let nameArray = []
    return allLoans.then(function(loan) {
      const allLoansArray = loan.toArray()
      // This for loop iterates through the loans data and grabs the principal
      // interest, length of the loan, and its name
      for (let i = 0; i < allLoansArray.length; i++) {
        let principalValue = allLoansArray[i].get('principal')
        let interestValue = allLoansArray[i].get('interest_rate')
        let lengthValue = allLoansArray[i].get('loan_length')
        let name = allLoansArray[i].get('name')
        // The values are then push into an array that is used in the graphs
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
    // The bar options tells the bar graphs to start at 0 no matter what
    // Chart.js responsive auto sets the y axis to start at the top of the
    // smallest bar chart
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
      .then(() => {
        this.transitionTo('profile');
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
      // console.log(loan)
      loan.destroyRecord()
        .then(() => {
          this.transitionTo('profile');
        })
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
