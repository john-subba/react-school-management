import {
  ADD_EXAM_DETAILS_SUCCESS,
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
      return {
        ...state,
        exams: payload,
        examsIsLoading: false,
      };

    default:
      return state;
  }
};

export default exam;
