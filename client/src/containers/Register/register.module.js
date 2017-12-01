import { failed$ } from '../../utils'
import { createSelector } from 'reselect'
import { addEntities } from '../../modules/entities/entities.module'
import { userSchema } from '../../modules/entities/schemas'
import { setAuthUser, setAuthTokens } from '../../modules/auth/auth.module'

export const moduleName = 'register'

const SUBMIT = 'pages/register/SUBMIT'
const SUCCESS = 'pages/register/SUCCESS'
const FAILED = 'pages/register/FAILED'
const CLEAR = 'pages/register/CLEAR'

// Reducer
const initState = {
  error: null,
  loading: false,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SUBMIT:
      return { ...state, loading: true, error: null }
    case SUCCESS:
      return { ...state, loading: false }
    case FAILED:
      return { ...state, loading: false, error: action.payload }
    case CLEAR:
      return initState
    default:
      return state
  }
}

// Selectors

export const getRegisterState = state => state.pages[moduleName]
export const getError = createSelector(getRegisterState, state => state.error)
export const isLoading = createSelector(
  getRegisterState,
  state => state.loading,
)

// Actions

export const submit = (name, email, password) => ({
  type: SUBMIT,
  payload: { name, email, password },
})

export const success = () => ({ type: SUCCESS })
export const failed = error => ({ type: FAILED, payload: error })
export const clear = () => ({ type: CLEAR })
// Epics

export const submit$ = (action$, _, { authClient }) =>
  action$
    .ofType(SUBMIT)
    .map(({ payload }) => payload)
    .switchMap(({ name, email, password }) =>
      authClient
        .register(name, email, password)
        .concatMap(({ user, token }) => [
          addEntities(user, userSchema),
          setAuthUser(user.id),
          setAuthTokens(token.token, token.refreshToken),
        ])
        .catch(failed$(FAILED)),
    )

export const epics = [submit$]
export default reducer
