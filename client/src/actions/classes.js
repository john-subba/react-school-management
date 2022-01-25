import {
  GET_CUR_CLASSES_SUCCESS,
  GET_CUR_CLASSES_FAILED,
  ADD_CLASS_SUCCESS,
} from '../constants/constant';
import axios from 'axios';

import { setAlert } from './alert';

export const loadCurSubClass = (_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/classes/${_id}`);

    if (res.data.length === 0) {
      dispatch(setAlert('Classes not found for this subjects', 'danger'));
    } else {
      dispatch({
        type: GET_CUR_CLASSES_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert('Classes successfully fetched', 'success'));
    }
  } catch (err) {
    dispatch({
      type: GET_CUR_CLASSES_FAILED,
    });
  }
};

export const addClass = (subjectData, _id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/classes/${_id}`, subjectData);

    dispatch({
      type: ADD_CLASS_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Class has been successfully added ', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      return errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch(setAlert('Class adding failed', 'danger'));
  }
};
