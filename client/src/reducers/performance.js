import { PERFORMANCE_ERROR } from "../actions/types";

const initialState = {
  performances: [],
  performance: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PERFORMANCE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
