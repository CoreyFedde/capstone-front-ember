import Ember from 'ember';

export default Ember.Route.extend({
  // Chart.js required a custom model to return objects and chart data
  model(params) {
    const allLoans = this.get('store').findAll('loan')
    const currentLoan = this.get('store').findRecord('loan', params.loan_id);
    return currentLoan.then(function() {

      // grabbing ticks for interest graph
      // Turns the years into months
      let loan_length_periods = currentLoan.get('loan_length') * 12

      // Sets the variables for following functions
      let interest_label_array = []
      let counter = 0
      let numberForArray = 0

      // If loan is for less than 10 years, track it every 6 months
      if (loan_length_periods <= 120) {
        // Iterate through and create an array of every 6th value until the length
        for (let i = 1; i <= loan_length_periods; i++) {
          counter++
          // On the first iteration, push zero into array
          if (i === 1) {
            interest_label_array.push(0)
          } else if (counter === 6) {
            interest_label_array.push(i)
            counter = 0
          }
        }
        // if the loan is for longer than 10 years, track it every year
      } else {
        // Iterate through and create an array of every 12th value until the length
        for (let i = 1; i <= loan_length_periods; i++) {
          counter++
          // On the first iteration, push zero into array
          if (i === 1) {
            interest_label_array.push(0)
          } else if (counter === 12) {
            numberForArray += 1
            interest_label_array.push(numberForArray)
            counter = 0
          }
        }
      }

      // grabbing partial data for abridged interest graph
      // This function grabs the data at every 6th or 12th point
      let interest_array = currentLoan.get('monthly_interest')
      let interest_data_array = [0]
      let interestCounter = 0
      if (interest_array.length <= 120) {
        for (let i = 0; i < interest_array.length; i++) {
          interestCounter++
          if (i === interest_array.length) {
            interest_data_array.push(0)
            // When the counter is 6, put the data point in the array and reset
            // the counter
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
            // When the counter is 12, put the data point in the array and reset
            // the counter
          } else if (interestCounter === 12) {
            interest_data_array.push(interest_array[i])
            interestCounter = 0
          }
        }
      }

      // grabbing parital data of principal
      let principal_array = currentLoan.get('monthly_principal')
      let principal_data_array = [0]
      let principalCounter = 0
      if (interest_array.length <= 120) {
        for (let i = 0; i < principal_array.length; i++) {
          principalCounter++
          if (i === principal_array.length) {
            principal_data_array.push(0)
            // When the counter is 6, put the data point in the array and reset
            // the counter
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
            // When the counter is 12, put the data point in the array and reset
            // the counter
          } else if (principalCounter === 12) {
            principal_data_array.push(principal_array[i])
            principalCounter = 0
          }
        }
      }

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
            // When the counter is 6, put the data point in the array and reset
            // the counter
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
            // When the counter is 12, put the data point in the array and reset
            // the counter
          } else if (balanceCounter === 12) {
            balance_data_array.push(balance_array[i])
            balanceCounter = 0
          }
        }
      }
      return {
        loanModel: currentLoan,
        donutChart: {
          labels: ['Principal', 'Interest'],
          datasets: [{
            backgroundColor: ['rgba(100, 81, 136, 0.7)', 'rgba(208, 202, 219, 0.7)'],
            data: [currentLoan.get('principal'),
              currentLoan.get('total_interest')
            ]
          }]
        },
        interestChart: {
          labels: interest_label_array,
          datasets: [{
              label: 'Interest',
              borderColor: 'rgba(136, 81, 89, 1)',
              // The fill false prevents the chart from showing the area under
              // the line
              fill: false,
              data: interest_data_array
            },
            {
              label: 'Principal',
              borderColor: 'rgba(100, 81, 136, 1)',
              fill: false,
              data: principal_data_array
            },
          ],
        },
        balanceChart: {
          labels: interest_label_array,
          datasets: [{
            label: 'Remaining balance',
            borderColor: 'rgba(136, 81, 89, 1)',
            backgroundColor: 'rgba(207, 185, 188, .5)',
            data: balance_data_array
          }],
        }
      }
    })
  }
});
