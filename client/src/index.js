import { getToken } from './modules/auth/auth.module'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import setupStore from './store'
import App from './containers/App'
import registerServiceWorker from './common/registerServiceWorker'
import { createBrowserHistory } from 'history'
import apis from './api'

const history = createBrowserHistory()
const store = setupStore({
  history,
  ...apis
})

store.subscribe(() => apis.httpClient.setApiToken(getToken(store.getState())))

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
)

registerServiceWorker()
