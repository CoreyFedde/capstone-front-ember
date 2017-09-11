import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  principal: DS.attr('number'),
  lender: DS.attr('string'),
  total_amount: DS.attr('number'),
  total_interest: DS.attr('number'),
  monthly_payment: DS.attr('number'),
  interest_rate: DS.attr('number'),
  loan_length: DS.attr('number'),
  monthly_interest: DS.attr(),
  monthly_principal: DS.attr(),
  monthly_balance: DS.attr()
});
