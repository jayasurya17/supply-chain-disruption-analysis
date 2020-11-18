import { 
	logIn, 
    signUp,
    setRoute,
    getUser,
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

const operations = {
	dispatchLogIn,
    dispatchSignUp,
    dispatchSetRoute,
    dispatchGetUser,
};

export default operations;