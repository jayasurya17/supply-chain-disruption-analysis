const signUp = (user) => ({
	type: 'PROFILE_SIGNUP',
	user,
});

const logIn = (user) => ({
	type: 'PROFILE_LOGIN',
	user,
});

const setUser = (user) => ({
    type: 'PROFILE_SETUSER',
    user,
});

const setRoute = (route) => ({
    type: 'PROFILE_SETROUTE',
    route,
})

export {
    logIn,
    setUser,
    signUp,
    setRoute,
};