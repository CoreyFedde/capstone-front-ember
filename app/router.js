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
  this.route('loan-review', { path: '/loans/:loan_id/review'});
  this.route('interest-vs-principal', { path: '/loans/:loan_id/versus'});
  this.route('balance-chart', { path: '/loans/:loan_id/balance'});
});

export default Router;
