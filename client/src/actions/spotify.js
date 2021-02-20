import axios from "axios";
import {
  SET_SPOTIFY_TOKEN,
  GET_SPOTIFY_SONGS_SUCCESS,
  GET_SPOTIFY_SONGS_FAILURE,
  GET_SPOTIFY_SONGS_BEGIN,
} from "./types";

export const setSpotifyToken = (token) => (dispatch) => {
  dispatch({
    type: SET_SPOTIFY_TOKEN,
    payload: token,
  });
};

export const getSpotifySongs = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(token);
  try {
    dispatch({
      type: GET_SPOTIFY_SONGS_BEGIN,
      loading: true,
    });

    const res = await axios.get("	https://api.spotify.com/v1/me/tracks", config);

    console.log(res);

    dispatch({
      type: GET_SPOTIFY_SONGS_SUCCESS,
      loading: false,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: GET_SPOTIFY_SONGS_FAILURE,
      loading: false,
      payload: err,
    });
  }
};
