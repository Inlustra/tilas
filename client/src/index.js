import AuthApi from './api/authApi'
import AuthClient from './common/authClient'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import setupStore, { startApplication } from './store'
import App from './containers/App'
import registerServiceWorker from './common/registerServiceWorker'
import { createBrowserHistory } from 'history'
import HttpClient from './common/httpClient'
import {
  getToken,
  getRefreshToken,
  setAuthTokens,
} from './modules/auth/auth.module'

const history = createBrowserHistory()
const httpClient = new HttpClient()
const authClient = new AuthClient()

const dependencies = {
  history,
  httpClient,
  authClient,
  authApi: new AuthApi(httpClient, authClient),
}

const store = setupStore(dependencies)
authClient.getToken = () => getToken(store.getState())
authClient.getRefreshToken = () => getRefreshToken(store.getState())
authClient.setTokens = (token, refreshToken) => {
  store.dispatch(setAuthTokens(token, refreshToken))
}

store.dispatch(startApplication())

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root'),
)

registerServiceWorker()
