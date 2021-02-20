import { combineReducers } from "redux";
import auth from "./auth";
import performance from "./performance";
import artist from "./artist";
import song from "./song";
import spotify from "./spotify";

export default combineReducers({ auth, performance, artist, song, spotify });
