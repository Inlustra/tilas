import { createSelector } from 'reselect'
import { toPayload } from '../../utils'
import { addEntities } from '../../modules/entities/entities.module'
import { userSchema } from '../../modules/entities/schemas'
import { setAuthUser, setAuthTokens } from '../../modules/auth/auth.module'

export const moduleName = 'register'

export const SUBMIT = 'pages/register/SUBMIT'

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

export const getRegisterState = state => state.pages[moduleName]
export const getError = createSelector(getRegisterState, state => state.error)
export const isLoading = createSelector(getRegisterState, state => state.loading)

// Actions

export const submitRegister = (name, email, password) => ({
  type: SUBMIT,
  payload: { name, email, password }
})

// Epics

export const submitRegister$ = (action$, _, { authClient }) =>
  action$
    .ofType(SUBMIT)
    .map(toPayload)
    .switchMap(({ name, email, password }) =>
      authClient.register(name, email, password)
        .concatMap(({ user, token }) => [
          addEntities(user, userSchema),
          setAuthUser(user.id),
          setAuthTokens(token.token, token.refreshToken)
        ])
    )

export const epics = [submitRegister$]
export default reducer
