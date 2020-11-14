import { 
	logIn, 
	signUp 
} from './actions';

const dispatchSignUp = dispatch => (user) => {
	dispatch(signUp(user));
}

const dispatchLogIn = dispatch => (user) => {
	dispatch(logIn(user));
}

const operations = {
	dispatchLogIn,
	dispatchSignUp,
};

export default operations;