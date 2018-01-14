import { failed$ } from '../../utils'
import { createSelector } from 'reselect'

export const moduleName = 'dashboard'

const LOAD = '/dashboard/LOAD'
const LOAD_SUCCESS = '/dashboard/LOAD_SUCCESS'
const LOAD_FAILED = '/dashboard/LOAD_FAILED'

// Reducer
const initState = {
  health: null,
  healthError: null
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      return { ...state, health: action.payload }
    case LOAD_FAILED:
      return { ...state, healthError: action.payload }
    default:
      return state
  }
}

// Selectors

export const getState = state => state.pages[moduleName]
export const getHealth = createSelector(getState, state => state.health)
export const getHealthError = createSelector(getState, state => state.healthError)

// Actions

export const load = () => ({
  type: LOAD,
})

const loadSuccess = health => ({
  type: LOAD_SUCCESS,
  payload: health,
})

// Epics

export const load$ = (action$, _, { healthApi }) =>
  action$
    .ofType(LOAD)
    .map(({ payload }) => payload)
    .switchMap(() =>
      healthApi
        .ping()
        .map(health => loadSuccess(health))
        .catch(failed$(LOAD_FAILED)),
    )

export const epics = [load$]
export default reducer
