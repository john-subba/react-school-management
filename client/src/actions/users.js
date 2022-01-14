import {
  ADD_TEACHER_DETAILS_SUCCESS,
  ADD_TEACHER_DETAILS_FAILED,
  ADD_SUBJECT_FAILED,
  ADD_SUBJECT_SUCCESS,
  DELETE_TEACHER_DETAILS_SUCCESS,
  DELETE_TEACHER_DETAILS_FAILED,
} from './actionTypes';
import axios from 'axios';

// redux
import { setAlert } from './alert';

// add teacher details
export const addTeacherDetails = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/users/teachers', formData);

    dispatch({
      type: ADD_TEACHER_DETAILS_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Staff is added.', 'success'));

    history.push('/dashboard');
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
export const deleteTeacher = (_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/users/teachers/${_id}`);

    dispatch({
      type: DELETE_TEACHER_DETAILS_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Staff has been succesfully removed.', 'success'));
  } catch (err) {
    dispatch({
      type: DELETE_TEACHER_DETAILS_FAILED,
    });
    dispatch(setAlert('Failed to remove staff', 'danger'));
  }
};

// @todo edit teacher details

// add subjects to the teacher
export const addSubjectDetails = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      '/api/users/teachers/:teacher_id/subjects',
      formData
    );

    dispatch({
      type: ADD_SUBJECT_SUCCESS,
      payload: res.data,
    });
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
