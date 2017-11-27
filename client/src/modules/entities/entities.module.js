import { combineReducers } from 'redux';
import userReducer from './users/users.module'
export const ADD_ENTITIES = 'ADD_ENTITIES';


const entityReducer = combineReducers({
  users: userReducer
});

export const addEntities = (entities) => ({
  type: ADD_ENTITIES,
  payload: entities
});

export default entityReducer;
