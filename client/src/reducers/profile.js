import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
} from '../actions/actionTypes';

const initialState = {
  profile: null,
  profiles: [],
  isLoading: true,
  error: {},
};

const profile = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default profile;
