import { combineReducers } from 'redux'
import { normalize } from 'normalizr'

import userReducer, { selectHydrated as selectUser } from './users/users.module'

export const moduleName = 'entities'

// Action Types

export const ADD_ENTITIES = 'entities/ADD_ENTITIES'

// Reducer

const entityReducer = combineReducers({
  users: userReducer
})

// Selectors

export const getEntitiesState = state => state[moduleName]
export const getUserEntity = (state, id) => selectUser(getEntitiesState(state), id)

// Actions

export const addEntities = (data, schema) => ({
  type: ADD_ENTITIES,
  payload: normalize(data, schema).entities
})

export default entityReducer
