import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import authEpics from './auth/auth.epics'
import entityReducer from './entities/entities.module'

const rootReducer = combineReducers({
  router: routerReducer,
  entities: entityReducer
})

const epics = [...authEpics]

export const setupStore = dependencies => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(dependencies.history),
        createEpicMiddleware(combineEpics(...epics), { dependencies })
      )
    )
  )

  return store
}

export default setupStore
