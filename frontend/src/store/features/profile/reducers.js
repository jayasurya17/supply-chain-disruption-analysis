const reducers = (state = { }, action) => {
    switch(action.type) {
    case 'PROFILE_SETUSER': {
        return {
            ...state,
            user: action.user,
        }
    }
    default:
        return state;
    }
};

export default reducers;