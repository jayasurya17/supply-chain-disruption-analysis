import { 
	logIn, 
    signUp,
    setRoute,
    getUser,
    logOut,
} from './actions';

const dispatchSignUp = dispatch => (user) => {
	dispatch(signUp(user));
}

const dispatchLogIn = dispatch => (payload) => {
	dispatch(logIn(payload));
}

const dispatchSetRoute = dispatch => (route) => {
    dispatch(setRoute(route));
}

const dispatchGetUser = dispatch => () => {
    dispatch(getUser());
}

const dispatchLogOut = dispatch => () => {
    dispatch(logOut());
}

const operations = {
	dispatchLogIn,
    dispatchSignUp,
    dispatchSetRoute,
    dispatchGetUser,
    dispatchLogOut,
};

export default operations;