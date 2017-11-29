import { ADD_ENTITIES } from '../entities.module'
import { userSchema } from '../schemas'
import { denormalize } from 'normalizr'

const reducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ENTITIES:
            return Object.entries(action.payload.users)
                .reduce((mergedUsers, [id, user]) => {
                    return {
                        ...mergedUsers,
                        [id]: {
                            ...(mergedUsers[id] || {}),
                            ...user
                        }
                    };
                }, state);
        default:
            return state
    }
}

export const selectHydrated = (state, id) => denormalize(id, userSchema, state);

export default reducer;

