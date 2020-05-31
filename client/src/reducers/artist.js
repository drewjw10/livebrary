import {
  CREATE_ARTIST_BEGIN,
  CREATE_ARTIST_SUCCESS,
  CREATE_ARTIST_FAILURE,
  GET_ARTIST_BEGIN,
  GET_ARTIST_SUCCESS,
  GET_ARTIST_FAILURE,
  GET_ARTISTLIST_BEGIN,
  GET_ARTISTLIST_SUCCESS,
  GET_ARTISTLIST_FAILURE,
} from "../actions/types";

const initialState = {
  artistList: null,
  artist: null,
  createdArtist: null,
  loading: true,
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
    case GET_ARTISTLIST_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_ARTISTLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        artistList: payload,
      };
    case GET_ARTISTLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.msg,
      };
    default:
      return state;
  }
}
