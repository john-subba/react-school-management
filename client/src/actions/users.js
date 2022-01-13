import {
  ADD_TEACHER_DETAILS_SUCCESS,
  ADD_TEACHER_DETAILS_FAILED,
  DELETE_TEACHER_DETAILS_SUCCESS,
  DELETE_TEACHER_DETAILS_FAILED,
  EDIT_TEACHER_DETAILS_SUCCESS,
  EDIT_TEACHER_DETAILS_FAILED,
  USER_LOADED,
  ADD_SUBJECT_FAILED,
} from './actionTypes';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// redux
import { setAlert } from './alert';

export const addTeacherDetails = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/users/teachers', formData);

    dispatch({
      type: ADD_TEACHER_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      return errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_TEACHER_DETAILS_FAILED,
    });
  }
};

// @todo delete teacher and their respective subjects also
// @todo edit teacher details

// add subjects to the teacher
export const addSubjectDetails = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      '/api/users/teachers/:teacher_id/subjects',
      formData
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_SUBJECT_FAILED,
    });
  }
};
