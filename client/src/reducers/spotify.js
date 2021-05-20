import {
  SET_SPOTIFY_TOKEN,
  GET_SPOTIFY_SONGS_BEGIN,
  GET_SPOTIFY_SONGS_SUCCESS,
  GET_SPOTIFY_SONGS_FAILURE,
  SEARCH_SPOTIFY_SONG_BEGIN,
  SEARCH_SPOTIFY_SONG_SUCCESS,
  SEARCH_SPOTIFY_SONG_FAILURE,
  SEARCH_SPOTIFY_ARTIST_BEGIN,
  SEARCH_SPOTIFY_ARTIST_SUCCESS,
  SEARCH_SPOTIFY_ARTIST_FAILURE,
  CLEAR_SPOTIFY_BEGIN,
  CLEAR_SPOTIFY_SUCCESS,
  CLEAR_SPOTIFY_FAILURE,
} from "../actions/types";

const initialState = {
  loading: false,
  token: "",
  songs: [],
  artists: [],
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SPOTIFY_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case GET_SPOTIFY_SONGS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_SPOTIFY_SONGS_SUCCESS:
      return {
        ...state,
        loading: false,
        songs: payload,
      };
    case GET_SPOTIFY_SONGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case SEARCH_SPOTIFY_SONG_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_SPOTIFY_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        songs: payload,
      };
    case SEARCH_SPOTIFY_SONG_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case SEARCH_SPOTIFY_ARTIST_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_SPOTIFY_ARTIST_SUCCESS:
      return {
        ...state,
        loading: false,
        artists: payload,
      };
    case SEARCH_SPOTIFY_ARTIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_SPOTIFY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_SPOTIFY_SUCCESS:
      return {
        ...initialState,
        loading: false,
      };
    case CLEAR_SPOTIFY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
