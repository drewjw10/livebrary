import axios from "axios";

import {
  GET_TOP_PERFORMANCES_BEGIN,
  GET_TOP_PERFORMANCES_SUCCESS,
  GET_TOP_PERFORMANCES_FAILURE,
  GET_RECENT_PERFORMANCES_BEGIN,
  GET_RECENT_PERFORMANCES_SUCCESS,
  GET_RECENT_PERFORMANCES_FAILURE,
  GET_PERFORMANCE_BEGIN,
  GET_PERFORMANCE_SUCCESS,
  GET_PERFORMANCE_FAILURE,
  CREATE_PERFORMANCE_BEGIN,
  CREATE_PERFORMANCE_SUCCESS,
  CREATE_PERFORMANCE_FAILURE,
} from "./types";

export const getPerformance = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PERFORMANCE_BEGIN,
    });
    const res = await axios.get(`/api/performances/${id}`);
    dispatch({
      type: GET_PERFORMANCE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PERFORMANCE_FAILURE,
    });
  }
};

export const createPerformance = (song, artist, venue, link) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ song, artist, venue, link });

  try {
    dispatch({
      type: CREATE_PERFORMANCE_BEGIN,
    });
    const res = await axios.post(`/api/performances/`, body, config);
    dispatch({
      type: CREATE_PERFORMANCE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_PERFORMANCE_FAILURE,
    });
  }
};

export const getTopPerformances = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TOP_PERFORMANCES_BEGIN,
    });
    const res = await axios.get("/api/performances/top");
    dispatch({
      type: GET_TOP_PERFORMANCES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_TOP_PERFORMANCES_FAILURE,
    });
  }
};

export const getRecentPerformances = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_RECENT_PERFORMANCES_BEGIN,
    });
    const res = await axios.get("/api/performances/recent");
    dispatch({
      type: GET_RECENT_PERFORMANCES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_RECENT_PERFORMANCES_FAILURE,
    });
  }
};
