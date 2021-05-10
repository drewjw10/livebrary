import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSong } from "../../../actions/song";
import {
  searchSpotifySong,
  clearSpotifySongSearch,
} from "../../../actions/spotify";
import { Redirect } from "react-router-dom";

import "./CreateSong.css";

const CreateSong = (props) => {
  const [formData, setFormData] = useState({
    spotifyName: "",
    name: "",
    selectedSpotifySong: "",
  });

  const { name, spotifyName, selectedSpotifySong } = formData;
  const { artistName, artistSpotifyId } = props;
  const createdSong = useSelector((state) => state.song.createdSong);
  const spotifySongs = useSelector((state) => state.spotify.songs);
  const token = useSelector((state) => state.spotify.token);
  const dispatch = useDispatch();
  const [spotifySearched, setSpotifySearched] = useState(true);
  const [selectedSpotifyObject, setSelectedSpotifyObject] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createSong(name, artistName));
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSelect = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    const selectedIndex = e.target.options.selectedIndex;
    const objIndex = e.target.options[selectedIndex].getAttribute("data-key");
    setSelectedSpotifyObject(spotifySongs.data.tracks.items[objIndex]);
  };

  const searchSpotify = (e) => {
    dispatch(clearSpotifySongSearch());
    setSpotifySearched(true);
    e.preventDefault();
    dispatch(searchSpotifySong(spotifyName, token));
    console.log(spotifySongs);
  };

  function populateSelectFromNewSearch() {
    setFormData({
      ...formData,
      selectedSpotifySong: `${spotifySongs.data.tracks.items[0].name} | ${spotifySongs.data.tracks.items[0].artists[0].name}`,
    });
    setSelectedSpotifyObject(spotifySongs.data.tracks.items[0]);
    setSpotifySearched(false);
  }

  if (createdSong) {
    return (
      <Redirect
        to={`/artists/${createdSong.artist_slug}/${createdSong.song.slug}`}
      />
    );
  }

  return (
    <form className='create-song' onSubmit={(e) => onSubmit(e)}>
      <label>Search for Spotify Song:</label>
      <div className='spotify-search'>
        <input
          type='text'
          name='spotifyName'
          value={spotifyName}
          placeholder='Song name'
          onChange={(e) => onChange(e)}
        />
        <button onClick={(e) => searchSpotify(e)}>Search Spotify</button>
      </div>
      {spotifySongs.length !== 0 && (
        <Fragment>
          <label>Select song name: </label>
          <select
            name='selectedSpotifySong'
            placeholder='Song name'
            onChange={(e) => onChangeSelect(e)}
            required
          >
            {spotifySongs.length !== 0 &&
              spotifySongs.data.tracks.items.map((song, i) => (
                <option key={i} data-key={i} name={song.name}>
                  {song.name} | {song.artists[0].name}
                </option>
              ))}
          </select>
          {spotifySearched && populateSelectFromNewSearch()}
        </Fragment>
      )}
      <label>Artist Spotify ID: {artistSpotifyId}</label>
      <label>
        Selected Spotify ID:{" "}
        {Object.keys(selectedSpotifyObject).length > 0 &&
          selectedSpotifyObject.artists[0].id}
      </label>
      {console.log(selectedSpotifyObject)}
      <input type='submit' value='Create Song' />
    </form>
  );
};

export default CreateSong;
