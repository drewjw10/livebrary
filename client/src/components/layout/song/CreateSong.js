import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSong } from "../../../actions/song";
import { searchSpotify, clearSpotifySearch } from "../../../actions/spotify";
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
  const dispatch = useDispatch();
  const [spotifySearched, setSpotifySearched] = useState(true);
  const [selectedSpotifyObject, setSelectedSpotifyObject] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Artist Spotify Id: ${artistSpotifyId}`);
    dispatch(
      createSong(
        selectedSpotifyObject.name,
        artistSpotifyId,
        selectedSpotifyObject.id
      )
    );
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
    console.log(selectedSpotifyObject);
  };

  const searchSpotifyHandler = (e) => {
    dispatch(clearSpotifySearch());
    setSpotifySearched(true);
    e.preventDefault();
    dispatch(searchSpotify(spotifyName, "track"));
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
    <div className='create-song__wrapper'>
      <form className='create-song__form' onSubmit={(e) => onSubmit(e)}>
        <label>Search for Spotify Song:</label>
        <div className='spotify-search'>
          <input
            type='text'
            name='spotifyName'
            value={spotifyName}
            placeholder='Song name'
            onChange={(e) => onChange(e)}
          />
          <button onClick={(e) => searchSpotifyHandler(e)}>
            Search Spotify
          </button>
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
        {Object.keys(selectedSpotifyObject).length !== 0 && (
          <p>
            {selectedSpotifyObject.artists[0].id === artistSpotifyId
              ? "Match"
              : "No Match"}
          </p>
        )}
        <input type='submit' value='Add Song' />
      </form>
    </div>
  );
};

export default CreateSong;
