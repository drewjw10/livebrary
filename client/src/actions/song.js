import {
  CREATE_SONG_BEGIN,
  CREATE_SONG_SUCCESS,
  CREATE_SONG_FAILURE,
  GET_SONG_BEGIN,
  GET_SONG_SUCCESS,
  GET_SONG_FAILURE,
} from "./types";
import axios from "axios";

export const createSong = (name, artist) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, artist });

  try {
    dispatch({
      type: CREATE_SONG_BEGIN,
    });

    const res = await axios.post("/api/songs/", body, config);
    dispatch({
      type: CREATE_SONG_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_SONG_FAILURE,
      payload: err,
    });
  }
};

export const getSong = (slug, artist_slug) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SONG_BEGIN,
    });

    const res = await axios.get(`/api/songs/slug/${artist_slug}/${slug}`);
    dispatch({
      type: GET_SONG_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SONG_FAILURE,
      payload: err,
    });
  }
};
