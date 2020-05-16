import axios from "axios";

import {
  GET_TOP_PERFORMANCES_BEGIN,
  GET_TOP_PERFORMANCES_SUCCESS,
  GET_TOP_PERFORMANCES_FAILURE,
  GET_RECENT_PERFORMANCES_BEGIN,
  GET_RECENT_PERFORMANCES_SUCCESS,
  GET_RECENT_PERFORMANCES_FAILURE,
} from "./types";

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
