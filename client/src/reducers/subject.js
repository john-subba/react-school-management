import {
  GET_CUR_SUBJECT_SUCCESS,
  GET_CUR_SUBJECT_FAILED,
  CLEAR_CUR_SUBJECT,
} from '../constants/constant';

const initialState = {
  subjects: null,
  isLoading: true,
};

const subject = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_CUR_SUBJECT_SUCCESS:
      return {
        ...state,
        subjects: payload,
        isLoading: false,
      };
    case CLEAR_CUR_SUBJECT:
      return {
        ...state,
        subjects: [],
        isLoading: false,
      };
    default:
      return state;
  }
};

export default subject;
