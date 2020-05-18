import {
  CREATE_SONG_BEGIN,
  CREATE_SONG_SUCCESS,
  CREATE_SONG_FAILURE,
  GET_SONG_BEGIN,
  GET_SONG_SUCCESS,
  GET_SONG_FAILURE,
} from "../actions/types";

const initialState = {
  song: null,
  createdSong: null,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SONG_BEGIN:
      return {
        loading: true,
      };
    case CREATE_SONG_SUCCESS:
      return {
        loading: false,
        createdSong: payload,
      };
    case CREATE_SONG_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    case GET_SONG_BEGIN:
      return {
        loading: true,
      };
    case GET_SONG_SUCCESS:
      return {
        loading: false,
        song: payload,
      };
    case GET_SONG_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
