class AuthClient {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  init(store, tokenSelector, refreshTokenSelector) {
    this.store = store
    this.tokenSelector = tokenSelector
    this.refreshTokenSelector = refreshTokenSelector
  }

  getApiToken() {
    return this.store ? this.tokenSelector(this.store.getState()) : null
  }

  getRefreshToken() {
    return this.store ? this.refreshTokenSelector(this.store.getState()) : null
  }

  mergeHeaders(headers = {}) {
    const token = this.getApiToken()
    return token
      ? Object.assign(headers, { Authorization: 'Bearer ' + token })
      : headers
  }

  get(url, headers) {
    return this.httpClient.get(url, this.mergeHeaders(headers))
  }

  put(url, body, headers) {
    return this.httpClient.put(url, body, this.mergeHeaders(headers))
  }

  post(url, body, headers) {
    return this.httpClient.post(url, body, this.mergeHeaders(headers))
  }

  patch(url, body, headers) {
    return this.httpClient.patch(url, body, this.mergeHeaders(headers))
  }

  delete(url, headers) {
    return this.httpClient.delete(url, this.mergeHeaders(headers))
  }
}

export default AuthClient
