import { signUp } from './actions';

const dispatchSignUp = dispatch => (user) => {
	dispatch(signUp(user));
}

const operations = {
	dispatchSignUp,
};

export default operations;