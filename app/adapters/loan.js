import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  createRecord(store, type, record) {
    const serialized = this.serialize(record, {includeID: true})
    const api = this.get('host')
    const url = `${api}/loans`
    delete serialized.monthly_payment
    delete serialized.total_amount
    delete serialized.total_interest
    const data = {loan: serialized}
    return this.ajax(url, 'POST', {data})
    return this.ajax(url, 'PUT', {data})
  },
  updateRecord(store, type, record) {
    const serialized = this.serialize(record, {includeID: true})
    const api = this.get('host')
    const url = `${api}/loans/${record.id}`
    delete serialized.monthly_payment
    delete serialized.total_amount
    delete serialized.total_interest
    const data = {loan: serialized}
    return this.ajax(url, 'PUT', {data})
  }
});
