import { failed$ } from '../../utils'
import { createSelector } from 'reselect'
import { addEntities } from '../../modules/entities/entities.module'
import { userSchema } from '../../modules/entities/schemas'
import { setAuthUser, setAuthTokens } from '../../modules/auth/auth.module'

export const moduleName = 'login'

const SUBMIT = '/login/SUBMIT'

// Reducer
const initState = {
  loading: true,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case START:
      return { ...state, loading: true, error: null }
    default:
      return state
  }
}

// Selectors

export const getState = state => state.pages[moduleName]
export const getError = createSelector(getState, state => state.error)
export const isLoading = createSelector(getState, state => state.loading)

// Actions

export const submit = (email, password) => ({
  type: SUBMIT,
  payload: { email, password },
})

export const success = () => ({ type: SUCCESS })
export const failed = error => ({ type: FAILED, payload: error })
export const clear = () => ({ type: CLEAR })
// Epics

export const submit$ = (action$, _, { authApi }) =>
  action$
    .ofType(SUBMIT)
    .map(({ payload }) => payload)
    .switchMap(({ email, password }) =>
      authApi
        .login(email, password)
        .concatMap(({ user, token }) => [
          addEntities(user, userSchema),
          setAuthUser(user.id),
          setAuthTokens(token.token, token.refreshToken),
        ])
        .catch(failed$(FAILED)),
    )

export const epics = [submit$]
export default reducer
