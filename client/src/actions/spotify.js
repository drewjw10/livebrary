import axios from "axios";
import {
  SET_SPOTIFY_TOKEN,
  GET_SPOTIFY_SONGS_SUCCESS,
  GET_SPOTIFY_SONGS_FAILURE,
  GET_SPOTIFY_SONGS_BEGIN,
  SEARCH_SPOTIFY_SONG_BEGIN,
  SEARCH_SPOTIFY_SONG_SUCCESS,
  SEARCH_SPOTIFY_SONG_FAILURE,
  SEARCH_SPOTIFY_ARTIST_BEGIN,
  SEARCH_SPOTIFY_ARTIST_SUCCESS,
  SEARCH_SPOTIFY_ARTIST_FAILURE,
  CLEAR_SPOTIFY_BEGIN,
  CLEAR_SPOTIFY_SUCCESS,
  CLEAR_SPOTIFY_FAILURE,
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

    const searchRequest = axios.create();
    delete searchRequest.defaults.headers.common["x-auth-token"];
    const res = await searchRequest.get(
      "https://api.spotify.com/v1/me/tracks",
      config
    );

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

export const searchSpotify = (searchText, token, type) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({
      type:
        type === "track"
          ? SEARCH_SPOTIFY_SONG_BEGIN
          : SEARCH_SPOTIFY_ARTIST_BEGIN,
      loading: true,
    });

    const base_url = "https://api.spotify.com/v1/search";

    const createSongRequest = axios.create();
    delete createSongRequest.defaults.headers.common["x-auth-token"];
    const res = await createSongRequest.get(
      `${base_url}?q=${encodeURI(searchText)}&type=${type}&limit=5`,
      config
    );

    dispatch({
      type:
        type === "track"
          ? SEARCH_SPOTIFY_SONG_SUCCESS
          : SEARCH_SPOTIFY_ARTIST_SUCCESS,
      loading: false,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type:
        type === "track"
          ? SEARCH_SPOTIFY_SONG_FAILURE
          : SEARCH_SPOTIFY_ARTIST_BEGIN,
      loading: false,
      payload: err,
    });
  }
};

export const clearSpotifySearch = () => (dispatch) => {
  dispatch({
    type: CLEAR_SPOTIFY_BEGIN,
  });
  dispatch({
    type: CLEAR_SPOTIFY_SUCCESS,
  });
};
