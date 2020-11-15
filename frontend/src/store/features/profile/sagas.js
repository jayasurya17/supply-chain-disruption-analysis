import {
    put,
    call,
    takeEvery,
    all,
} from 'redux-saga/effects';
import * as R from 'ramda';
import axios from 'axios';
import { message } from 'antd';

import {
    setUser,
} from './actions'
import backendURL from '../../../constants/connection';

function* logIn(action) {
    try {
        const result = yield call(axios.post, backendURL + '/users/login', action.user);
        message.loading('Logging in', 3);
        console.log(result);
        if (!R.isNil(result) && !R.isEmpty(result)) {
            if(result.status === 200) {
                message.success('Login successful!', 2);
                yield put(setUser(result.data));
                /* User has to redirected to the home page after successful login. */
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

function* watchLogIn() {
  yield takeEvery('PROFILE_LOGIN', logIn);
}

function* watchSignUp() {
  yield takeEvery('PROFILE_SIGNUP', signUp);
}

export default function* rootSaga() {
  yield all([
    watchLogIn(),
    watchSignUp(),
  ]);
}