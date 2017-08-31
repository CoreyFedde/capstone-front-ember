import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  principal: DS.attr('string'),
  lender: DS.attr('string'),
  // total_amount: DS.attr('string'),
  // total_interest: DS.attr('string'),
  // monthly_payment: DS.attr('string'),
  interest_rate: DS.attr('string'),
  loan_length: DS.attr('string')
});
