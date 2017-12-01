import { Observable } from 'rxjs/Observable'

export const failed$ = type => ({ response, status }) =>
  Observable.of({ type: type, payload: { response, status } })
