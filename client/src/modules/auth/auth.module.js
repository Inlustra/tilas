import { createSelector } from 'reselect'
import { getUserEntity } from '../entities/entities.module'

export const moduleName = 'auth'

export const SET_AUTH_USER = 'auth/SET_AUTH_USER'
export const SET_AUTH_TOKENS = 'auth/SET_AUTH_TOKENS'

// Reducer
const initState = {
  userId: '',
  refreshToken: '',
  token: ''
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return { ...state, userId: action.payload }
    case SET_AUTH_TOKENS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

// Selectors

export const getAuthState = state => state[moduleName]
export const getToken = createSelector(getAuthState, state => state.token)
export const getRefreshToken = createSelector(getAuthState, state => state.refreshToken)
export const getUserId = createSelector(getAuthState, state => state.userId)
export const getUser = createSelector(state => state, getUserId, getUserEntity)

// Actions

export const setAuthUser = userId => ({
  type: SET_AUTH_USER,
  payload: userId
})

export const setAuthTokens = (token, refreshToken) => ({
  type: SET_AUTH_TOKENS,
  payload: { token, refreshToken }
})

export default reducer
