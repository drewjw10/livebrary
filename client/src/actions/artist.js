import axios from "axios";
import {
  CREATE_ARTIST_BEGIN,
  CREATE_ARTIST_SUCCESS,
  CREATE_ARTIST_FAILURE,
  GET_ARTIST_BEGIN,
  GET_ARTIST_SUCCESS,
  GET_ARTIST_FAILURE,
  CLEAR_ARTIST_BEGIN,
  CLEAR_ARTIST_SUCCESS,
  CLEAR_ARTIST_FAILURE,
  GET_ARTISTLIST_BEGIN,
  GET_ARTISTLIST_SUCCESS,
  GET_ARTISTLIST_FAILURE,
} from "./types";

export const createArtist = (name, spotifyId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, spotifyId });

  try {
    dispatch({
      type: CREATE_ARTIST_BEGIN,
      loading: true,
    });
    const res = await axios.post("/api/artists/", body, config);
    dispatch({
      type: CREATE_ARTIST_SUCCESS,
      loading: false,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_ARTIST_FAILURE,
      loading: false,
      payload: err,
    });
  }
};

export const getArtist = (slug) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ARTIST_BEGIN,
      loading: true,
    });
    const res = await axios.get(`/api/artists/${slug}`);
    dispatch({
      type: GET_ARTIST_SUCCESS,
      payload: res.data,
      loading: false,
    });
  } catch (err) {
    dispatch({
      type: GET_ARTIST_FAILURE,
      payload: err,
      loading: false,
    });
  }
};

export const getArtistList = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ARTISTLIST_BEGIN,
      loading: true,
    });
    const res = await axios.get("/api/artists/");
    dispatch({
      type: GET_ARTISTLIST_SUCCESS,
      payload: res.data,
      loading: false,
    });
  } catch (err) {
    dispatch({
      type: GET_ARTISTLIST_FAILURE,
      payload: err,
      loading: false,
    });
  }
};

export const clearArtistState = () => (dispatch) => {
  dispatch({
    type: CLEAR_ARTIST_BEGIN,
  });
  dispatch({
    type: CLEAR_ARTIST_SUCCESS,
  });
};
