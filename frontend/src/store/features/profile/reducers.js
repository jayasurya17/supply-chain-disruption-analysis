const reducers = (state = { }, action) => {
    switch(action.type) {
    case 'PROFILE_SETUSER': {
        return {
            ...state,
            user: action.user,
        }
    }
    case 'PROFILE_SETROUTE': {
        return {
            ...state,
            route: action.route,
        }
    }
    default:
        return state;
    }
};

export default reducers;