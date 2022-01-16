import {
  ADD_TEACHER_DETAILS_SUCCESS,
  ADD_TEACHER_DETAILS_FAILED,
  ADD_SUBJECT_FAILED,
  ADD_SUBJECT_SUCCESS,
  DELETE_TEACHER_DETAILS_SUCCESS,
  DELETE_TEACHER_DETAILS_FAILED,
  EDIT_TEACHER_DETAILS_FAILED,
  EDIT_TEACHER_DETAILS_SUCCESS,
  GET_CURRENT_TEACHER_SUCCESS,
  GET_CURRENT_TEACHER_FAILED,
  DELETE_SUBJECT_FAILED,
  DELETE_SUBJECT_SUCCESS,
} from '../constants/constant';
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

// delete teacher and their respective subjects also
export const deleteTeacher = (teacher_id, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/users/teachers/${teacher_id}`);

    dispatch({
      type: DELETE_TEACHER_DETAILS_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Staff has been succesfully removed.', 'success'));

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: DELETE_TEACHER_DETAILS_FAILED,
    });
    dispatch(setAlert('Failed to remove staff', 'danger'));
  }
};

// edit teacher details
export const editTeacher = (formData, _id, history) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/users/teachers/${_id}`, formData);

    dispatch({
      type: EDIT_TEACHER_DETAILS_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('User successfully updated', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EDIT_TEACHER_DETAILS_FAILED,
    });
  }
};

// get current teacher by teacher id
export const getCurrentTeacher = (_id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/teachers/${_id}`);
    dispatch({
      type: GET_CURRENT_TEACHER_SUCCESS,
      payload: res.data,
    });

    history.push('/teacher-profile');
  } catch (err) {
    dispatch({
      type: GET_CURRENT_TEACHER_FAILED,
    });
  }
};

// add subjects to the teacher
export const addSubjectDetails = (formData, _id) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/users/teachers/${_id}/subjects`,
      formData
    );

    dispatch({
      type: ADD_SUBJECT_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Subject added successfully', 'success'));
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

// delete subject by its id
export const deleteSubject = (teacher_id, _id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/users/teachers/${teacher_id}/subjects/${_id}`
    );

    dispatch({
      type: DELETE_SUBJECT_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Subject has been successfully deleted', 'success'));
  } catch (err) {
    dispatch({
      type: DELETE_SUBJECT_FAILED,
    });
  }
};
