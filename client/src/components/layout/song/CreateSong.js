import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSong } from "../../../actions/song";
import { searchSpotifySong } from "../../../actions/spotify";
import { Redirect } from "react-router-dom";

import "./CreateSong.css";

const CreateSong = () => {
  const [formData, setFormData] = useState({
    spotifyName: "",
    name: "",
    artist: "",
  });

  const { name, artist, spotifyName } = formData;

  const createdSong = useSelector((state) => state.song.createdSong);
  const spotifySongs = useSelector((state) => state.spotify.songs);
  const token = useSelector((state) => state.spotify.token);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createSong(name, artist));
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const searchSpotify = (e) => {
    e.preventDefault();
    dispatch(searchSpotifySong(spotifyName, token));
  };

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
      {spotifySongs && console.log(spotifySongs)}
      <label>Select song name: </label>
      <select
        name='name'
        value={name}
        placeholder='Song name'
        onChange={(e) => onChange(e)}
        required
      >
        {spotifySongs.length !== 0 &&
          spotifySongs.data.tracks.items.map((song) => (
            <option name={song.name}>
              {song.name} | {song.artists[0].name}
            </option>
          ))}
      </select>
      <label>Artist: </label>
      <input
        type='text'
        name='artist'
        value={artist}
        placeholder='Artist name'
        onChange={(e) => onChange(e)}
        required
      />
      <input type='submit' value='Create Song' />
    </form>
  );
};

export default CreateSong;
