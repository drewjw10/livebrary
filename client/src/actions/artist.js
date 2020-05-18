import axios from "axios";
import {
  CREATE_ARTIST_BEGIN,
  CREATE_ARTIST_SUCCESS,
  CREATE_ARTIST_FAILURE,
  GET_ARTIST_BEGIN,
  GET_ARTIST_SUCCESS,
  GET_ARTIST_FAILURE,
} from "./types";

export const createArtist = (name) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name });

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

export const getArtist = (id) => async (dispatch) => {
  try {
    console.log(`id param: ${id}`);
    dispatch({
      type: GET_ARTIST_BEGIN,
    });
    const res = await axios.get(`/api/artists/${id}`);
    dispatch({
      type: GET_ARTIST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ARTIST_FAILURE,
      payload: err,
    });
  }
};
