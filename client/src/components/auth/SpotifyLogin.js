import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSpotifyToken } from "../../actions/spotify";

import "./SpotifyLogin.css";

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "0b24c19c94c441dcafae7333050a645a";
const redirectUri = "http://localhost:3000/login/";
const scopes = ["user-library-read"];

// Get the hash of the url
/*const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = ""; */

const SpotifyLogin = () => {
  const [token, setToken] = useState("");
  const [params, setParams] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    let _token = window.location.href.split("=")[1];
    if (_token) {
      setToken(_token);
      localStorage.setItem("spotify-auth-token", _token);
    }
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        {!token && (
          <a
            className='btn btn--loginApp-link'
            href={`${authEndpoint}?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
      </header>
    </div>
  );
};

export default SpotifyLogin;
