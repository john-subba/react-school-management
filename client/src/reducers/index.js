import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import exam from './exam';
import subject from './subject';

export default combineReducers({
  alert,
  exam,
  auth,
  subject,
});
