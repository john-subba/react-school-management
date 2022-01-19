import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_PROFILE,
  GET_USER_FAILED,
  GET_CURRENT_USER,
  TEACHER_LOADED,
} from '../constants/constant';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// load teacher
export const loadTeacher = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth/teacher');
    dispatch({
      type: TEACHER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// get current user after logging in
export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/me');

    dispatch({
      type: GET_CURRENT_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_FAILED,
    });
    dispatch(setAlert('User not found', 'danger'));
  }
};

// register user
export const registerUser =
  ({ name, schoolName, schoolAddress, schoolPhoneNo, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      name,
      schoolName,
      schoolAddress,
      schoolPhoneNo,
      email,
      password,
    });

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert('User logged in', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAILED,
      });
    }
  };

// login user
export const loginUser =
  (email, password, userName, isAdmin) => async (dispatch) => {
    if (isAdmin === undefined) {
      dispatch(setAlert('Please select your role', 'danger'));
    }
    if (isAdmin === true) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({
        email,
        password,
        isAdmin,
      });

      try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(loadUser());
      } catch (err) {
        const error = err.response.data.msg;

        if (error) {
          dispatch(setAlert(error, 'danger'));
        }

        dispatch({
          type: LOGIN_FAILED,
        });
      }
    }
    if (isAdmin === false) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ email, userName, password, isAdmin });

      try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(loadTeacher());
      } catch (err) {
        const error = err.response.data.msg;

        if (error) {
          dispatch(setAlert(error, 'danger'));
        }

        dispatch({
          type: LOGIN_FAILED,
        });
      }
    }
  };

// logout user
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
};
