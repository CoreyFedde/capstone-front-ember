import Ember from 'ember';

export default Ember.Component.extend({
  // This include the auth service and can tell if the user has been authenticated
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

});
