import {
    put,
    call,
    takeEvery,
    all,
} from 'redux-saga/effects';
import * as R from 'ramda';
import axios from 'axios';
import { message } from 'antd';
import Cookies from 'universal-cookie';

import {
    setRoute,
    setUser,
} from './actions'
import backendURL from '../../../constants/connection';
const cookies = new Cookies();

function* logIn(action) {
    try {
        
        const result = yield call(axios.post, backendURL + '/users/login', action.payload.user);
        const loadingMessage = message.loading('Logging in', 3);
        // console.log(result);
        if (!R.isNil(result) && !R.isEmpty(result)) {
            if(result.status === 200) {
                loadingMessage(); // Calling the variable that holds the message, will close the message.
                message.success('Login successful!', 2);
                yield put(setUser(result.data));
                if (!R.isNil(action.payload.redirectURL) && !R.isEmpty(action.payload.redirectURL)) {
                    yield put(setRoute(action.payload.redirectURL));
                } else {
                    yield put(setRoute('/dashboard'));
                }
            } else {
                
            }
        }
    }catch(error) {
        message.error('Error logging in' + R.pathOr(500, ['response', 'statusText'] , error), 3);
    }
}

function* signUp(action) {
    try {
        const result = yield call(axios.post, backendURL + '/users/signup' , action.user);
        const loadingMessage = message.loading('Signing up', 3);
        // console.log(result);
        if (!R.isNil(result) && !R.isEmpty(result)) {
            if(result.status === 201) {
                loadingMessage();
                message.success('Account successfully created, please login', 2);
            } else {

            }
        }
    } catch(error) {
        message.error('Error signing up' + R.pathOr(500, ['response', 'statusText'] , error), 3);
    }
}

function* getUser(action) {
    try {
        if(!R.isNil(cookies.get('access_token')) && !R.isEmpty(cookies.get('access_token'))) {
            const result = yield call(axios.post, backendURL + '/users/validateToken', {}, {
                headers: {
                'Authorization': 'Bearer ' + cookies.get('access_token'),
            }});
            if (!R.isNil(result) && !R.isEmpty(result)) 
            {
                if(result.status === 200) {
                    yield put(setUser(result.data));
                }
            }
        } else {
            yield put(setRoute('/dashboard')); /* If there is no access token, whenever there is a getUser call, we will default to /dashboard. */
        }
    } catch(error) {
        /* This case will occur when there is an access token, but it is either corrupted or expired. */
        cookies.remove('access_token', { path: '/', domain: 'localhost' });
        yield put(setRoute('/welcome'));
    }
}

// eslint-disable-next-line
function* logOut(action) {
    try {
        cookies.remove('access_token', { path: '/', domain: 'localhost' });
        console.log('cookies removed');
    } catch(error) {

    }
}

function* watchLogIn() {
    yield takeEvery('PROFILE_LOGIN', logIn);
}

function* watchSignUp() {
    yield takeEvery('PROFILE_SIGNUP', signUp);
}

function* watchGetUser() {
    yield takeEvery('PROFILE_GETUSER', getUser);
}

function* watchLogOut() {
    yield takeEvery('PROFILE_LOGOUT', logOut);
}

export default function* rootSaga() {
  yield all([
    watchLogIn(),
    watchSignUp(),
    watchGetUser(),
    watchLogOut(),
  ]);
}