import { createSelector } from 'reselect'
import { toPayload } from '../../utils'
import { addEntities } from '../../modules/entities/entities.module'
import { userSchema } from '../../modules/entities/schemas'
import { setAuthUser, setAuthTokens } from '../../modules/auth/auth.module'

export const moduleName = 'login'

export const SUBMIT = 'pages/login/SUBMIT'

// Reducer
const initState = {
  error: null,
  loading: false
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// Selectors

export const getState = state => state.pages[moduleName]
export const getError = createSelector(getState, state => state.error)
export const isLoading = createSelector(getState, state => state.loading)

// Actions

export const submitLogin = (email, password) => ({
  type: SUBMIT,
  payload: { email, password }
})

// Epics

export const submitLogin$ = (action$, _, { authClient }) =>
  action$
    .ofType(SUBMIT)
    .map(toPayload)
    .switchMap(({ email, password }) =>
      authClient.login(email, password)
        .concatMap(({ user, token }) => [
          addEntities(user, userSchema),
          setAuthUser(user.id),
          setAuthTokens(token.token, token.refreshToken)
        ])
    )

export const epics = [submitLogin$]
export default reducer
