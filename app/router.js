import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users');
  this.route('loans');
  this.route('profile');
  this.route('loan', { path: '/loans/:loan_id' });
  this.route('loans-edit', { path: '/loans/:loan_id/edit'});
});

export default Router;
