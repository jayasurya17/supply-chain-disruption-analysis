import { 
	logIn, 
    signUp,
    setRoute,
} from './actions';

const dispatchSignUp = dispatch => (user) => {
	dispatch(signUp(user));
}

const dispatchLogIn = dispatch => (user) => {
	dispatch(logIn(user));
}

const dispatchSetRoute = dispatch => (route) => {
    dispatch(setRoute(route));
}

const operations = {
	dispatchLogIn,
    dispatchSignUp,
    dispatchSetRoute,
};

export default operations;