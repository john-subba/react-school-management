import {
  GET_CUR_CLASSES_SUCCESS,
  GET_CUR_CLASSES_FAILED,
  ADD_CLASS_SUCCESS,
} from '../constants/constant';

const initialState = {
  classes: null,
  isLoading: true,
};

const classes = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CUR_CLASSES_SUCCESS:
    case ADD_CLASS_SUCCESS:
      return {
        ...state,
        classes: payload,
        isLoading: false,
      };
    case GET_CUR_CLASSES_FAILED:
      return {
        ...state,
        classes: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default classes;
