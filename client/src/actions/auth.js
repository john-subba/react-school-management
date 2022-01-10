import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAILED } from './actionTypes';

// register the user
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
    } catch (err) {
      dispatch({
        type: REGISTER_FAILED,
      });
    }
  };
