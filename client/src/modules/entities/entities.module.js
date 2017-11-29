import { combineReducers } from 'redux';
import userReducer, { selectHydrated as selectUser } from './users/users.module'

export const moduleName = 'entities'

export const ADD_ENTITIES = 'entities/ADD_ENTITIES';


const entityReducer = combineReducers({
  users: userReducer
});

export const getEntitiesState = state => state[moduleName]

export const getUserEntity = (state, id) => selectUser(getEntitiesState(state), id)

export const addEntities = ({ entities }) => ({
  type: ADD_ENTITIES,
  payload: entities
});

  export default entityReducer;
