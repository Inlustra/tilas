import { setAuthTokens, setAuthUser } from "./auth.module";
import { toPayload } from "../utils";
import { PERFORM_LOGIN, PERFORM_REGISTER } from './auth.module'
import { addEntities } from "../entities/entities.module";
import { normalize } from "normalizr";
import { userSchema } from '../entities/schemas'

export const performLogin$ = (action$, _, { api }) =>
  action$
    .ofType(PERFORM_LOGIN)
    .map(toPayload)
    .switchMap(({ email, password }) =>
      api
        .post('/api/auth/login', { email, password })
        .map(({ response }) => response)
        .do(console.log)
        .concatMap(({ user, token }) => [
          addEntities(normalize(user, userSchema)),
          setAuthUser(user.id),
          setAuthTokens(token.token, token.refreshToken)
        ])
    )

export const performRegister$ = (action$, _, { api }) =>
  action$
    .ofType(PERFORM_REGISTER)
    .map(toPayload)
    .switchMap(({ name, email, password }) =>
      api
        .post('/api/auth/register', { name, email, password })
        .map(({ response }) => response)
        .do(console.log)
        .concatMap(({ user, token }) => [
          addEntities(normalize(user, userSchema)),
          setAuthUser(user.id),
          setAuthTokens(token.token, token.refreshToken)
        ])
    )

export default [performLogin$, performRegister$]
