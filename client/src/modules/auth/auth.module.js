import { createSelector } from 'reselect'

// Reducer
const initState = {
    authedUser: '',
    token: ''
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return { ...state, token: action.payload }
        default:
            return state
    }
}

// Selectors

// Actions
export const setToken = token => ({ type: 'SET_TOKEN', payload: token })
export const performLogin = (email, password) => ({
    type: 'PERFORM_LOGIN', payload: { email, password }
})

export default reducer
