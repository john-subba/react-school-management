import {
  ADD_EXAM_DETAILS_FAILED,
  ADD_EXAM_DETAILS_SUCCESS,
  DELETE_EXAM_FAILED,
  DELETE_EXAM_SUCCESS,
  EDIT_EXAM_DETAILS_FAILED,
  EDIT_EXAM_DETAILS_SUCCESS,
  GET_USER_EXAMS_FAILED,
  GET_USER_EXAMS_SUCCESS,
} from '../constants/constant';
import axios from 'axios';

import { setAlert } from './alert';

export const loadCurrentExams = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/exams');
    dispatch({
      type: GET_USER_EXAMS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.msg;

    if (error) {
      dispatch(setAlert(error, 'danger'));
    }

    dispatch({
      type: GET_USER_EXAMS_FAILED,
    });
  }
};

export const addExamDetails = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/exams', formData);

    dispatch({
      type: ADD_EXAM_DETAILS_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Exam Added Successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_EXAM_DETAILS_FAILED,
    });
  }
};

export const editExamDetails = (formData, _id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/exams/${_id}`, formData);

    dispatch({
      type: EDIT_EXAM_DETAILS_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Exam details has been successfully update', 'success'));
    dispatch(loadCurrentExams());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EDIT_EXAM_DETAILS_FAILED,
    });
  }
};

export const deleteExamDetails = (_id, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/exams/${_id}`);

    dispatch({
      type: DELETE_EXAM_SUCCESS,
      payload: res.data,
    });
    history.push('/dashboard');
    dispatch(setAlert('Exam has been successfully removed', 'success'));
  } catch (err) {
    dispatch({
      type: DELETE_EXAM_FAILED,
    });
  }
};
