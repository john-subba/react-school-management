import { GET_CURRENT_TEACHER_SUCCESS } from '../actions/actionTypes';

const initialState = {
  isLoading: true,
  teacherProfile: null,
};

const teacher = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENT_TEACHER_SUCCESS:
      return {
        ...state,
        teacherProfile: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default teacher;
