import {
  GET_TOP_PERFORMANCES_BEGIN,
  GET_TOP_PERFORMANCES_SUCCESS,
  GET_TOP_PERFORMANCES_FAILURE,
  GET_RECENT_PERFORMANCES_BEGIN,
  GET_RECENT_PERFORMANCES_SUCCESS,
  GET_RECENT_PERFORMANCES_FAILURE,
} from "../actions/types";

const initialState = {
  topPerformances: [],
  recentPerformances: [],
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TOP_PERFORMANCES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_TOP_PERFORMANCES_SUCCESS:
      return {
        ...state,
        topPerformances: payload,
        loading: false,
      };

    case GET_TOP_PERFORMANCES_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
        topPerformances: [],
      };
    case GET_RECENT_PERFORMANCES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_RECENT_PERFORMANCES_SUCCESS:
      return {
        ...state,
        recentPerformances: payload,
        loading: false,
      };

    case GET_RECENT_PERFORMANCES_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
        recentPerformances: [],
      };
    default:
      return state;
  }
}
