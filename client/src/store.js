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

import dashboardPageReducer, {
  epics as dashboardPageEpics,
  moduleName as dashboardPageModuleName,
} from './containers/Dashboard/dashboard.module'
import loginPageReducer, {
  epics as loginPageEpics,
  moduleName as loginPageModuleName,
} from './containers/Login/login.module'
import registerPageReducer, {
  epics as registerPageEpics,
  moduleName as registerPageModuleName,
} from './containers/Register/register.module'

import authReducer, {
  epics as authEpics,
  moduleName as authModuleName,
  setAuthTokens,
} from './modules/auth/auth.module'
import entityReducer, {
  addEntities,
  moduleName as entitiesModuleName,
} from './modules/entities/entities.module'
import { createSelector } from 'reselect'

// Store

const START_APP = 'app/START_APP'
const SET_LOADED = 'app/SET_LOADED'

const rootModuleName = 'app'
const initState = {
  loaded: false,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADED:
      return { ...state, loaded: true }
    default:
      return state
  }
}

// Actions

export const setLoaded = () => ({ type: SET_LOADED })

export const startApplication = () => ({
  type: START_APP,
})

// Selectors

export const getRootState = state => state[rootModuleName]
export const isLoaded = createSelector(getRootState, state => state.loaded)

// Reducers

const rootReducer = combineReducers({
  [rootModuleName]: reducer,
  router: routerReducer,
  pages: combineReducers({
    [loginPageModuleName]: loginPageReducer,
    [registerPageModuleName]: registerPageReducer,
    [dashboardPageModuleName]: dashboardPageReducer,
  }),
  [entitiesModuleName]: entityReducer,
  [authModuleName]: authReducer,
})

// Epics

const initApplication$ = (action$, _, { authApi }) =>
  Observable.combineLatest(
    action$.ofType(START_APP),
    action$.ofType(localStorageActionTypes.INIT),
  )
    .map(([startAppAction, localStorageAction]) => localStorageAction)
    .map(({ payload }) => payload[authModuleName])
    .filter(auth => !!auth && !!auth.token)
    .switchMap(payload =>
      authApi
        .me()
        .concatMap(user => [addEntities(user, userSchema), setLoaded()])
        .catch(() => Observable.of(setAuthTokens(null, null))),
    )

const rootEpics = [initApplication$]

const epics = [
  ...rootEpics,
  ...authEpics,
  ...loginPageEpics,
  ...registerPageEpics,
  ...dashboardPageEpics,
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
