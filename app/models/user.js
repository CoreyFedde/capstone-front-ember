import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  first_name: DS.attr('string'),
  income: DS.attr('string'),
  rent: DS.attr('string')
});
