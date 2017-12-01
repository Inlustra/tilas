import { Observable } from 'rxjs'

let apiToken

function setApiToken(token) {
  apiToken = token
}

function mergeHeaders(headers = {}) {
  return apiToken
    ? Object.assign(headers, { Authorization: 'Bearer ' + apiToken })
    : headers
}

function get(url, headers) {
  return Observable.ajax.get(url, mergeHeaders(headers))
}

function put(url, body, headers) {
  return Observable.ajax.put(url, body, mergeHeaders(headers))
}

function post(url, body, headers) {
  return Observable.ajax.post(url, body, mergeHeaders(headers))
}

function patch(url, body, headers) {
  return Observable.ajax.patch(url, body, mergeHeaders(headers))
}

function del(url, headers) {
  return Observable.ajax.delete(url, this.mergeHeaders(headers))
}

export default {
  setApiToken,
  mergeHeaders,
  get,
  put,
  post,
  patch,
  delete: del,
}
