import {
  CREATE_ARTIST_BEGIN,
  CREATE_ARTIST_SUCCESS,
  CREATE_ARTIST_FAILURE,
  GET_ARTIST_BEGIN,
  GET_ARTIST_SUCCESS,
  GET_ARTIST_FAILURE,
} from "../actions/types";

const initialState = {
  artist: null,
  createdArtist: null,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ARTIST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_ARTIST_SUCCESS:
      return {
        ...state,
        loading: false,
        createdArtist: payload,
      };
    case CREATE_ARTIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    case GET_ARTIST_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_ARTIST_SUCCESS:
      return {
        ...state,
        loading: false,
        artist: payload,
      };
    case GET_ARTIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.msg,
      };
    default:
      return state;
  }
}
