import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { setupStore } from './modules'
import App from './containers/App'
import registerServiceWorker from './common/registerServiceWorker'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

render(
  <Provider store={setupStore(history)}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
)

registerServiceWorker()
