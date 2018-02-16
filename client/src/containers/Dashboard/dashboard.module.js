import { failed$ } from '../../utils'
import { createSelector } from 'reselect'

export const moduleName = 'dashboard'

const PAGE_LOAD = 'dashboard/PAGE_LOAD'

const LOAD_HEALTH = 'dashboard/LOAD_HEALTH'
const LOAD_HEALTH_SUCCESS = 'dashboard/LOAD_HEALTH_SUCCESS'
const LOAD_HEALTH_FAILED = 'dashboard/LOAD_HEALTH_FAILED'

const LOAD_TILS = 'dashboard/LOAD_TILS'
const LOAD_TILS_SUCCESS = 'dashboard/LOAD_TILS_SUCCESS'
const LOAD_TILS_FAILED = 'dashboard/LOAD_TILS_FAILED'

// Reducer
const initState = {
  health: null,
  healthError: null,
  tils: [],
  tilsError: null,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_TILS_SUCCESS:
      return { ...state, tils: action.payload, tilsError: null }
    case LOAD_TILS_FAILED:
      return { ...state, tilsError: action.payload, tils: [] }
    case LOAD_HEALTH_SUCCESS:
      return { ...state, health: action.payload, healthError: null }
    case LOAD_HEALTH_FAILED:
      return { ...state, health: null, healthError: action.payload }
    default:
      return state
  }
}

// Selectors

export const getState = state => state.pages[moduleName]
export const getHealth = createSelector(getState, state => state.health)
export const getHealthError = createSelector(
  getState,
  state => state.healthError,
)
export const getTils = createSelector(getState, state => state.tils)
export const getTilsError = createSelector(getState, state => state.tilsError)

// Actions

export const pageLoad = () => ({
  type: PAGE_LOAD,
})

export const loadHealth = () => ({ type: LOAD_HEALTH })
const loadHealthSuccess = health => ({
  type: LOAD_HEALTH_SUCCESS,
  payload: health,
})

export const loadTils = () => ({ type: LOAD_TILS })
const loadTilsSuccess = tils => ({
  type: LOAD_TILS_SUCCESS,
  payload: tils,
})

// Epics

export const pageLoad$ = action$ =>
  action$.ofType(PAGE_LOAD).concatMap(() => [loadHealth(), loadTils()])

export const loadTils$ = (action$, _, { healthApi }) =>
  action$
    .ofType(LOAD_TILS)
    .map(({ payload }) => payload)
    .switchMap(() =>
      healthApi
        .ping()
        .map(health => loadTilsSuccess(health))
        .catch(failed$(LOAD_TILS_FAILED)),
    )

export const loadHealth$ = (action$, _, { healthApi }) =>
  action$
    .ofType(LOAD_HEALTH)
    .map(({ payload }) => payload)
    .switchMap(() =>
      healthApi
        .ping()
        .map(health => loadHealthSuccess(health))
        .catch(failed$(LOAD_HEALTH_FAILED)),
    )

export const epics = [pageLoad$, loadHealth$, loadTils$]
export default reducer
