import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import exam from './exam';
import subject from './subject';
import classes from './classes';

export default combineReducers({
  alert,
  exam,
  auth,
  subject,
  classes,
});
