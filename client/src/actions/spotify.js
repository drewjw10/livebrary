import axios from "axios";
import {
  SET_SPOTIFY_TOKEN,
  GET_SPOTIFY_SONGS_SUCCESS,
  GET_SPOTIFY_SONGS_FAILURE,
  GET_SPOTIFY_SONGS_BEGIN,
  SEARCH_SPOTIFY_SONG_BEGIN,
  SEARCH_SPOTIFY_SONG_SUCCESS,
  SEARCH_SPOTIFY_SONG_FAILURE,
  CLEAR_SPOTIFY_SONG_BEGIN,
  CLEAR_SPOTIFY_SONG_SUCCESS,
  CLEAR_SPOTIFY_SONG_FAILURE,
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
  try {
    dispatch({
      type: GET_SPOTIFY_SONGS_BEGIN,
      loading: true,
    });

    const res = await axios.get("	https://api.spotify.com/v1/me/tracks", config);

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

export const searchSpotifySong = (searchText, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({
      type: SEARCH_SPOTIFY_SONG_BEGIN,
      loading: true,
    });

    const base_url = "https://api.spotify.com/v1/search";

    const res = await axios.get(
      `${base_url}?q=${encodeURI(searchText)}&type=track&limit=5`,
      config
    );

    dispatch({
      type: SEARCH_SPOTIFY_SONG_SUCCESS,
      loading: false,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_SPOTIFY_SONG_FAILURE,
      loading: false,
      payload: err,
    });
  }
};

export const clearSpotifySongSearch = () => (dispatch) => {
  dispatch({
    type: CLEAR_SPOTIFY_SONG_BEGIN,
  });
  dispatch({
    type: CLEAR_SPOTIFY_SONG_SUCCESS,
  });
};
