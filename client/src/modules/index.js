import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import authEpics from './auth/auth.epics'
import authReducer, { moduleName as authModuleName } from './auth/auth.module';
import entityReducer, { moduleName as entitiesModuleName } from './entities/entities.module'

// Reducers

const rootReducer = combineReducers({
  router: routerReducer,
  [entitiesModuleName]: entityReducer,
  [authModuleName]: authReducer
})

// Epics

const epics = [...authEpics]

// Setup Store

const setupStore = dependencies => {
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
