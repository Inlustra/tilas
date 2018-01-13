import HttpClient from './httpClient'
import { Observable } from 'rxjs'

class AuthClient extends HttpClient {
  getToken = () => {}
  getRefreshToken = () => {}
  setTokens = (token, refreshToken) => {}

  mergeHeaders(headers = {}) {
    const token = this.getToken();
    return token
      ? Object.assign(headers, { Authorization: 'Bearer ' + token })
      : headers
  }

  handleErrorResponse(error, request) {
    if (error.status === 401) {
      const refreshToken = this.getRefreshToken()
      if (refreshToken) {
        return (this.pendingRefresh$ =
          this.pendingRefresh$ ||
          this.attemptRefresh(refreshToken)
            .do(() => (this.pendingRefresh$ = null))
            .switchMap(token => super.request(request))
            .catch(() => {
              this.setTokens(null, null)
              return Observable.throw(error)
            }))
      } else {
        this.setTokens(null, null)
      }
    }
    return Observable.throw(error)
  }

  attemptRefresh(refreshToken) {
    return super
      .post('/api/auth/refresh', { refreshToken })
      .map(({ response }) => response)
      .do(({ newToken, newRefreshToken }) =>
        this.setTokens(newToken, newRefreshToken),
      )
      .share()
  }

  request(ajaxRequest) {
    console.log(ajaxRequest)
    return super
      .request({
        ...ajaxRequest,
        headers: this.mergeHeaders(ajaxRequest.headers),
      })
      .catch(error => this.handleErrorResponse(error, ajaxRequest))
  }
}

export default AuthClient
