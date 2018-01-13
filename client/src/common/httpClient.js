import { Observable } from 'rxjs'

class HttpClient {
  /**
   *
   * @param {AjaxRequest} ajaxRequest
   */
  request(ajaxRequest) {
    return Observable.ajax(ajaxRequest)
  }

  get(url, headers) {
    return this.request({
      url,
      headers,
      method: 'get',
    })
  }

  put(url, body, headers) {
    return this.request({
      url,
      body,
      headers,
      method: 'put',
    })
  }

  post(url, body, headers) {
    return this.request({
      url,
      body,
      headers,
      method: 'post',
    })
  }

  patch(url, body, headers) {
    return this.request({
      url,
      headers,
      body,
      method: 'patch',
    })
  }

  delete(url, headers) {
    return this.request({
      url,
      headers,
      method: 'delete',
    })
  }
}

export default HttpClient
