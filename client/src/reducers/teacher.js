import {
  ADD_SUBJECT_SUCCESS,
  ADD_TEACHER_DETAILS_FAILED,
  DELETE_SUBJECT_FAILED,
  DELETE_SUBJECT_SUCCESS,
  GET_CURRENT_TEACHER_SUCCESS,
} from '../constants/constant';

const initialState = {
  isLoading: true,
  teacherProfile: null,
};

const teacher = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENT_TEACHER_SUCCESS:
    case ADD_SUBJECT_SUCCESS:
    case DELETE_SUBJECT_SUCCESS:
      return {
        ...state,
        teacherProfile: payload,
        isLoading: false,
      };
    case ADD_TEACHER_DETAILS_FAILED:
    case DELETE_SUBJECT_FAILED:
      return {
        ...state,
        payload: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default teacher;
