import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    const currentLoan = this.get('store').findRecord('loan', params.loan_id);
    console.log('currentLoan', currentLoan)
    return currentLoan.then(function() {
        return {
          loanModel: currentLoan,
          donutChart: {
            labels: ['Principal', 'Interest'],
            datasets: [{
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 0, 255, 0.1)'],
              data: [currentLoan.get('principal'),
                     currentLoan.get('total_interest')]
            }]
          }
        }
      })
    }
  });
