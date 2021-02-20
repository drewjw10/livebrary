import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpotifySongs } from "../../../actions/spotify";

import "./SpotifyTracks.css";

const SpotifyTracks = (props) => {
  // const spotifyToken = useSelector((state) => state.spotify.token);
  const spotifyToken = localStorage.getItem("spotify-auth-token");
  const spotifySongs = useSelector((state) => state.spotify.songs);
  const loading = useSelector((state) => state.spotify.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotifySongs(spotifyToken));
  }, []);

  return (
    <ul>
      {spotifySongs.length !== 0 &&
        spotifySongs.data.items.map((item) => <li>{item.track.name}</li>)}
    </ul>

    // spotifySongs.data.items.map((item) => item.name))
  );
  // spotifySongs.map((song) => <li>{song}</li>)
};

export default SpotifyTracks;
