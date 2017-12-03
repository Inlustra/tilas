import { getRefreshToken, getToken } from './modules/auth/auth.module'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import setupStore from './store'
import App from './containers/App'
import registerServiceWorker from './common/registerServiceWorker'
import { createBrowserHistory } from 'history'
import HttpClient from './common/httpClient'
import AuthHttpClient from './common/authClient'
import apis from './api'

const history = createBrowserHistory()
const httpClient = new HttpClient()
const authHttpClient = new AuthHttpClient(httpClient)

const store = setupStore({
  history,
  ...apis(httpClient, authHttpClient),
})

authHttpClient.init(store, getToken, getRefreshToken)

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
