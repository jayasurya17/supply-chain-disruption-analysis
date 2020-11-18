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
        message.loading('Logging in', 3);
        console.log(result);
        if (!R.isNil(result) && !R.isEmpty(result)) {
            if(result.status === 200) {
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
        message.loading('Signing up', 3);
        console.log(result);
        if (!R.isNil(result) && !R.isEmpty(result)) {
            if(result.status === 201) {
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
                    yield put(setRoute('/dashboard'));
                }
            }
        } else {
            yield put(setRoute('/dashboard')); /* If there is no access token, whenever there is a getUser call, we will default to /dashboard. */
        }
    } catch(error) {
        /* This case will occur when there is an access token, but it is either corrupted or expired. */
        cookies.remove('access_token');
        yield put(setRoute('/welcome'));
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

export default function* rootSaga() {
  yield all([
    watchLogIn(),
    watchSignUp(),
    watchGetUser(),
  ]);
}