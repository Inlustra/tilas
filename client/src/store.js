import { userSchema } from './modules/entities/schemas'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import { Observable } from 'rxjs'

import persistState, {
  mergePersistedState,
  actionTypes as localStorageActionTypes,
} from 'redux-localstorage'
import localStorageFilter from 'redux-localstorage-filter'

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
  setAuthTokens,
} from './modules/auth/auth.module'
import entityReducer, {
  addEntities,
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

const initApplication$ = (action$, _, { httpClient, authClient }) =>
  action$
    .ofType(localStorageActionTypes.INIT)
    .map(({ payload }) => payload[authModuleName])
    .filter(auth => !!auth && !!auth.token)
    .do(({ token }) => httpClient.setApiToken(token))
    .switchMap(payload =>
      authClient
        .me()
        .map(user => addEntities(user, userSchema))
        .catch(() => Observable.of(setAuthTokens(null, null))),
    )

const rootEpics = [initApplication$]

const epics = [
  ...rootEpics,
  ...authEpics,
  ...loginPageEpics,
  ...registerPageEpics,
]

// Setup Store

const setupStore = dependencies => {
  const storage = compose(localStorageFilter(authModuleName))(
    adapter(window.localStorage),
  )

  const epicMiddleware = createEpicMiddleware(combineEpics(...epics), {
    dependencies,
  })

  const middleware = composeWithDevTools(
    persistState(storage),
    applyMiddleware(routerMiddleware(dependencies.history), epicMiddleware),
  )

  const reducer = compose(mergePersistedState())(rootReducer)
  return createStore(reducer, middleware)
}

export default setupStore
