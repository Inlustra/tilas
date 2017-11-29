import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import setupStore from './modules'
import App from './containers/App'
import registerServiceWorker from './common/registerServiceWorker'
import { createBrowserHistory } from 'history'
import ApiClient from './api'

const api = new ApiClient();
const history = createBrowserHistory()
const store = setupStore({
  history,
  api
});

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
