import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'

const epicMiddleware = createEpicMiddleware(
  combineEpics(),
  {
    dependencies: {}
  }
)

const rootReducer = combineReducers({
  router: routerReducer,
})

export const setupStore = history => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), epicMiddleware)
    )
  )

  return store
}

export default setupStore
