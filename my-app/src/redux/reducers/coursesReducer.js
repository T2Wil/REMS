import {
  CREATE_COURSE_FAILURE,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_START,
  GET_COURSE_SUCCESS,
  UPDATE_COURSE_MEMBERS,
  GET_COURSE_MEMBERS,
  GET_COURSE_MEMBERS_ERROR
} from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isLoaded: false,
  user: {},
  values: [],
  members: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_COURSE_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: [...state.values, payload],
      };
    case GET_COURSE_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: [...payload],
      };
    case CREATE_COURSE_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: payload,
      };
    case UPDATE_COURSE_MEMBERS:
      return {
        ...state,
        onUpdatingMembers: payload,
      };
      case GET_COURSE_MEMBERS:
        return{
          ...state,
          members: payload
        };
      case GET_COURSE_MEMBERS_ERROR:
        return{
          ...state,
          error: payload
        }
    default:
      return state;
  }
};
