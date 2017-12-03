import { Observable } from 'rxjs'

class HttpClient {
  get(url, headers) {
    return Observable.ajax.get(url, headers)
  }

  put(url, body, headers) {
    return Observable.ajax.put(url, body, headers)
  }

  post(url, body, headers) {
    return Observable.ajax.post(url, body, headers)
  }

  patch(url, body, headers) {
    return Observable.ajax.patch(url, body, headers)
  }

  delete(url, headers) {
    return Observable.ajax.delete(url, headers)
  }
}

export default HttpClient
