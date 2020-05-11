import { combineReducers } from "redux";
import auth from "./auth";
import performance from "./performance";

export default combineReducers({ auth, performance });
