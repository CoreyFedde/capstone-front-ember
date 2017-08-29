import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  principal: DS.attr('string'),
  lender: DS.attr('string')
});
