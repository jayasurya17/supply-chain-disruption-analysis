const signUp = (user) => ({
	type: 'PROFILE_SIGNUP',
	user,
});

const logIn = (payload) => ({
	type: 'PROFILE_LOGIN',
    payload,
});

const setUser = (user) => ({
    type: 'PROFILE_SETUSER',
    user,
});

const setRoute = (route) => ({
    type: 'PROFILE_SETROUTE',
    route,
});

const getUser = () => ({
    type: 'PROFILE_GETUSER',
});

const logOut = () => ({
    type: 'PROFILE_LOGOUT',
});

export {
    logIn,
    setUser,
    signUp,
    setRoute,
    getUser,
    logOut,
};