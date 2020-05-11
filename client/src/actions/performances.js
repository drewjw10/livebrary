import axios from "axios";
import { GET_TOP_PERFORMANCES, PERFORMANCE_ERROR } from "./types";

export const getTopPerformances = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/performances/top");

    dispatch({
      type: GET_TOP_PERFORMANCES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PERFORMANCE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
