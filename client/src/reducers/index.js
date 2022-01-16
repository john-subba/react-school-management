import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import teacher from './teacher';

export default combineReducers({
  alert,
  auth,
  profile,
  teacher,
});
