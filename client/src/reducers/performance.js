import {
  GET_TOP_PERFORMANCES_BEGIN,
  GET_TOP_PERFORMANCES_SUCCESS,
  GET_TOP_PERFORMANCES_FAILURE,
  GET_RECENT_PERFORMANCES_BEGIN,
  GET_RECENT_PERFORMANCES_SUCCESS,
  GET_RECENT_PERFORMANCES_FAILURE,
  GET_PERFORMANCE_BEGIN,
  GET_PERFORMANCE_SUCCESS,
  GET_PERFORMANCE_FAILURE,
  CREATE_PERFORMANCE_BEGIN,
  CREATE_PERFORMANCE_SUCCESS,
  CREATE_PERFORMANCE_FAILURE,
  VOTE_PERFORMANCE_BEGIN,
  VOTE_PERFORMANCE_SUCCESS,
  VOTE_PERFORMANCE_FAILURE,
  CLEAR_PERFORMANCE_BEGIN,
  CLEAR_PERFORMANCE_SUCCESS,
  CLEAR_PERFORMANCE_FAILURE,
  GET_PERFORMANCES_BEGIN,
  GET_PERFORMANCES_SUCCESS,
  GET_PERFORMANCES_FAILURE,
  GET_OBJECTS_BEGIN,
  GET_OBJECTS_SUCCESS,
  GET_OBJECTS_FAILURE,
  CLEAR_SEARCH,
} from "../actions/types";

const initialState = {
  performance: null,
  createdPerformance: null,
  performanceList: [],
  search: null,
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
        performanceList: payload,
        loading: false,
      };

    case GET_TOP_PERFORMANCES_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
        performanceList: [],
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
        performanceList: payload,
        loading: false,
      };

    case GET_RECENT_PERFORMANCES_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
        performanceList: [],
      };
    case CREATE_PERFORMANCE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_PERFORMANCE_SUCCESS:
      return {
        ...state,
        createdPerformance: payload,
        loading: false,
      };

    case CREATE_PERFORMANCE_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
        createdPerformance: null,
      };
    case GET_PERFORMANCE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_PERFORMANCE_SUCCESS:
      return {
        ...state,
        performance: payload,
        loading: false,
      };

    case GET_PERFORMANCE_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
        performance: null,
      };
    case VOTE_PERFORMANCE_BEGIN:
      return {
        ...state,
        error: null,
      };

    case VOTE_PERFORMANCE_SUCCESS:
      return {
        ...state,
      };

    case VOTE_PERFORMANCE_FAILURE:
      return {
        ...state,
        error: payload.error,
        performance: null,
      };
    case CLEAR_PERFORMANCE_BEGIN:
      return {
        ...state,
        error: null,
      };

    case CLEAR_PERFORMANCE_SUCCESS:
      return initialState;

    case GET_PERFORMANCES_BEGIN:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case GET_PERFORMANCES_SUCCESS:
      return {
        ...state,
        loading: false,
        performanceList: payload,
      };

    case GET_PERFORMANCES_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
        performanceList: null,
      };

    case GET_OBJECTS_BEGIN:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case GET_OBJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        search: payload,
      };

    case GET_OBJECTS_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
        search: null,
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        search: null,
      };

    default:
      return state;
  }
}
