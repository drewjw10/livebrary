import axios from "axios";
import { PERFORMANCE_ERROR } from "./types";

export const getTopPerformances = () => async () => {
  try {
    const res = await axios.get("/api/performances/top");
    return res.data;
  } catch (err) {
    return err;
  }
};
