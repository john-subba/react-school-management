import {
  ADD_SUBJECT_FAILED,
  ADD_SUBJECT_SUCCESS,
  CLEAR_CUR_SUBJECT,
  GET_CUR_SUBJECT_FAILED,
  GET_CUR_SUBJECT_SUCCESS,
} from '../constants/constant';
import axios from 'axios';
import { setAlert } from './alert';

export const loadCurrExamSubject = (_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/subjects/${_id}`);

    if (res.data.length === 0) {
      dispatch(setAlert('Subjects not found for this examination', 'danger'));
    } else {
      dispatch({
        type: GET_CUR_SUBJECT_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert('Subjects successfully fetched', 'success'));
    }
  } catch (err) {
    dispatch({
      type: GET_CUR_SUBJECT_FAILED,
    });
  }
};

export const clearPrevSubject = () => (dispatch) => {
  dispatch({
    type: CLEAR_CUR_SUBJECT,
  });
};

export const addSubject = (formData) => async (dispatch) => {};
