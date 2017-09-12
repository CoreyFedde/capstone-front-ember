import ApplicationAdapter from './application';

// These adapters wrap the data being sent back to the API
// The deleted serialized attributes are virtuals that will cause a 500 error
// if included in the request
export default ApplicationAdapter.extend({
  createRecord(store, type, record) {
    const serialized = this.serialize(record, {includeID: true});
    const api = this.get('host');
    const url = `${api}/loans`;
    delete serialized.monthly_payment;
    delete serialized.total_amount;
    delete serialized.total_interest;
    delete serialized.monthly_interest;
    delete serialized.monthly_principal;
    delete serialized.monthly_balance;
    const data = {loan: serialized};
    return this.ajax(url, 'POST', {data});
    return this.ajax(url, 'PUT', {data});
  },
  updateRecord(store, type, record) {
    const serialized = this.serialize(record, {includeID: true});
    const api = this.get('host');
    const url = `${api}/loans/${record.id}`;
    delete serialized.monthly_payment;
    delete serialized.total_amount;
    delete serialized.total_interest;
    delete serialized.monthly_interest;
    delete serialized.monthly_principal;
    delete serialized.monthly_balance;
    const data = {loan: serialized};
    return this.ajax(url, 'PUT', {data});
  }
});
