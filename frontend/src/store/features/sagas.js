import { all } from 'redux-saga/effects';
import { combinedSaga as profileSaga } from './profile';

export default function* rootSaga() {
    yield all([
		profileSaga(),
    ]);
  }