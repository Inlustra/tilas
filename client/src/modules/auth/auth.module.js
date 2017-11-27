import { createSelector } from 'reselect'

// Reducer
const initState = {
  authedUser: '',
  token: ''
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {...state, token: action.payload.token}
    default:
      return state
  }
}

// Selectors

// Actions
export const setToken = (payload) => ({type: 'SET_TOKEN', payload})
export const performLogin = (payload) => ({ type: 'PERFORM_LOGIN', payload })

export default reducer
