import { combineReducers } from 'redux';
import { reducers as profile } from './profile';

const rootReducer = combineReducers({
  profile,
});

export default rootReducer;