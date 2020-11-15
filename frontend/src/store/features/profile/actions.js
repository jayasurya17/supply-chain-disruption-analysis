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

export {
    logIn,
    setUser,
    signUp,
};