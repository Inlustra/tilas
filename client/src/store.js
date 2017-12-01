import { routerMiddleware, routerReducer } from 'react-router-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import loginPageReducer, {
  epics as loginPageEpics,
  moduleName as loginPageModuleName,
} from './containers/Login/login.module'

import registerPageReducer, {
  epics as registerPageEpics,
  moduleName as registerPageModuleName,
} from './containers/Register/register.module'

import authEpics from './modules/auth/auth.epics'
import authReducer, {
  moduleName as authModuleName,
} from './modules/auth/auth.module'
import entityReducer, {
  moduleName as entitiesModuleName,
} from './modules/entities/entities.module'

// Reducers

const rootReducer = combineReducers({
  router: routerReducer,
  pages: combineReducers({
    [loginPageModuleName]: loginPageReducer,
    [registerPageModuleName]: registerPageReducer,
  }),
  [entitiesModuleName]: entityReducer,
  [authModuleName]: authReducer,
})

// Epics

const epics = [...authEpics, ...loginPageEpics, ...registerPageEpics]

// Setup Store

const setupStore = dependencies => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(dependencies.history),
        createEpicMiddleware(combineEpics(...epics), { dependencies }),
      ),
    ),
  )

  return store
}

export default setupStore
