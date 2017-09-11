import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    const currentLoan = this.get('store').findRecord('loan', params.loan_id);
    return currentLoan.then(function() {
      // grabbing ticks for interest graph
      let loan_length_periods = currentLoan.get('loan_length') * 12
      let interest_label_array = []
      let counter = 0
      let numberForArray = 0
      if (loan_length_periods <= 120) {
        for (let i = 1; i <= loan_length_periods; i++) {
          counter++
          if (i === 1) {
            interest_label_array.push(0)
          } else if (counter === 6) {
            interest_label_array.push(i)
            counter = 0
          }
        }
      } else {
      for (let i = 1; i <= loan_length_periods; i++) {
        counter++
          if (i === 1) {
            interest_label_array.push(0)
          } else if (counter === 12) {
            numberForArray += 1
            interest_label_array.push(numberForArray)
            counter = 0
          }
        }
      }
      console.log(interest_label_array)

      // grabbing partial data for abridged interest graph
      let interest_array = currentLoan.get('monthly_interest')
      let interest_data_array = [0]
      let interestCounter = 0
      if (interest_array.length <= 120) {
        for (let i = 0; i < interest_array.length; i++) {
          interestCounter++
          if (i === interest_array.length) {
            interest_data_array.push(0)
          } else if (interestCounter === 6) {
            interest_data_array.push(interest_array[i])
            interestCounter = 0
          }
        }
      } else {
        for (let i = 0; i < interest_array.length; i++) {
          interestCounter++
          if (i === interest_array.length) {
            interest_data_array.push(0)
          } else if (interestCounter === 12) {
            interest_data_array.push(interest_array[i])
            interestCounter = 0
          }
        }
      }
      console.log(interest_data_array)
      // grabbing parital data of principal
      let principal_array = currentLoan.get('monthly_principal')
      let principal_data_array = [0]
      let principalCounter = 0
      if (interest_array.length <= 120) {
      for (let i = 0; i < principal_array.length; i++) {
        principalCounter++
         if (i === principal_array.length) {
          principal_data_array.push(0)
        } else if (principalCounter === 6) {
          principal_data_array.push(principal_array[i])
          principalCounter = 0
        }
      }
    } else {
      for (let i = 0; i < principal_array.length; i++) {
        principalCounter++
         if (i === principal_array.length) {
          principal_data_array.push(0)
        } else if (principalCounter === 12) {
          principal_data_array.push(principal_array[i])
          principalCounter = 0
        }
      }
    }
      console.log(principal_data_array)
      // grabbing parital data of balance
      let balance_array = currentLoan.get('monthly_balance')
      let first_balance = currentLoan.get('principal')
      let balance_data_array = [first_balance]
      let balanceCounter = 0
      if (balance_array.length <= 120) {
      for (let i = 0; i < balance_array.length; i++) {
        balanceCounter++
        if (i === balance_array.length || balance_array[i] < 0) {
          balance_data_array.push(0)
        } else if (balanceCounter === 6) {
          balance_data_array.push(balance_array[i])
          balanceCounter = 0
        }
      }
    } else {
      for (let i = 0; i < balance_array.length; i++) {
        balanceCounter++
        if (i === balance_array.length || balance_array[i] < 0) {
          balance_data_array.push(0)
        } else if (balanceCounter === 12) {
          balance_data_array.push(balance_array[i])
          balanceCounter = 0
        }
      }
    }
      console.log(balance_data_array)

        return {
          loanModel: currentLoan,
          donutChart: {
            labels: ['Principal', 'Interest'],
            datasets: [{
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 0, 255, 0.1)'],
              data: [currentLoan.get('principal'),
                     currentLoan.get('total_interest')]
            }]
          },
          interestChart: {
            labels: interest_label_array,
            datasets: [{
              label: 'Interest',
              data: interest_data_array
            },
            {
              label: 'Principal',
              data: principal_data_array
            },
          ],

        },
        balanceChart: {
          labels: interest_label_array,
          datasets: [{
            label: 'Remaining balance',
            data: balance_data_array
          }],
        }
        }
      })
    }
  });
