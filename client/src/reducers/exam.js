import {
  ADD_EXAM_DETAILS_SUCCESS,
  DELETE_EXAM_FAILED,
  DELETE_EXAM_SUCCESS,
  EDIT_EXAM_DETAILS_FAILED,
  EDIT_EXAM_DETAILS_SUCCESS,
  GET_USER_EXAMS_FAILED,
  GET_USER_EXAMS_SUCCESS,
} from '../constants/constant';

const initialState = {
  exams: [],
  examsIsLoading: true,
};

const exam = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_EXAMS_SUCCESS:
    case ADD_EXAM_DETAILS_SUCCESS:
    case EDIT_EXAM_DETAILS_SUCCESS:
    case DELETE_EXAM_SUCCESS:
      return {
        ...state,
        exams: payload,
        examsIsLoading: false,
      };
    case GET_USER_EXAMS_FAILED:
    case EDIT_EXAM_DETAILS_FAILED:
    case DELETE_EXAM_FAILED:
      return {
        ...state,
        exams: null,
        examsIsLoading: false,
      };
    default:
      return state;
  }
};

export default exam;
