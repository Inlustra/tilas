import { setToken } from "./auth.module";
import { toPayload } from "../utils";


export const performLogin$ = (action$, _, { api }) =>
action$
  .ofType('PERFORM_LOGIN')
  .map(toPayload)
  .switchMap(({email, password}) =>
    api
      .post('/api/login', { email, password })
      .concatMap(({ user, token }) => [
        setToken(token)
      ])
  )

export default [performLogin$]
