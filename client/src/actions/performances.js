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
  VOTE_PERFORMANCE_BEGIN,
  VOTE_PERFORMANCE_SUCCESS,
  VOTE_PERFORMANCE_FAILURE,
  CLEAR_PERFORMANCE_BEGIN,
  CLEAR_PERFORMANCE_SUCCESS,
  CLEAR_PERFORMANCE_FAILURE,
  GET_PERFORMANCES_BEGIN,
  GET_PERFORMANCES_SUCCESS,
  GET_PERFORMANCES_FAILURE,
  GET_OBJECTS_BEGIN,
  GET_OBJECTS_SUCCESS,
  GET_OBJECTS_FAILURE,
  CLEAR_SEARCH,
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

export const createPerformance = (
  song,
  artist,
  venue,
  link,
  description
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ song, artist, venue, link, description });

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
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({
      type: GET_TOP_PERFORMANCES_BEGIN,
    });
    const res = await axios.get("/api/performances/top", config);
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

export const getRecentPerformances = (user) => async (dispatch) => {
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

export const votePerformance = (performanceId, voteValue, index) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ voteValue: voteValue, index: index });

  try {
    dispatch({
      type: VOTE_PERFORMANCE_BEGIN,
    });

    const res = await axios.post(
      `/api/performances/vote/${performanceId}`,
      body,
      config
    );

    dispatch({
      type: VOTE_PERFORMANCE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VOTE_PERFORMANCE_FAILURE,
      payload: err.message,
    });
  }
};

export const clearPerformanceState = () => (dispatch) => {
  dispatch({
    type: CLEAR_PERFORMANCE_BEGIN,
  });
  dispatch({
    type: CLEAR_PERFORMANCE_SUCCESS,
  });
};

export const getPerformances = (user, song) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ user: user });

  try {
    dispatch({
      type: GET_PERFORMANCES_BEGIN,
    });
    const res = await axios.get(`/api/performances/song/${song}`, body, config);
    dispatch({
      type: GET_PERFORMANCES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PERFORMANCES_FAILURE,
    });
  }
};

export const searchObjects = (searchText) => async (dispatch) => {
  const body = JSON.stringify({ searchText: searchText });

  try {
    dispatch({
      type: GET_OBJECTS_BEGIN,
    });
    const res = await axios.get(`/api/performances/search/${searchText}`);
    dispatch({
      type: GET_OBJECTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_OBJECTS_FAILURE,
      payload: err,
    });
  }
};

export const clearSearch = () => (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH,
  });
};
