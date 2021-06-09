import React, { Fragment, useState } from "react";
import { createArtist } from "../../../actions/artist";
import { searchSpotify, clearSpotifySearch } from "../../../actions/spotify";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import "./CreateArtist.css";

const CreateArtist = () => {
  const [formData, setFormData] = useState({
    spotifyName: "",
    selectedSpotifyArtist: "",
  });

  const spotifyName = formData.spotifyName;

  const createdArtist = useSelector((state) => state.artist.createdArtist);
  const spotifyArtists = useSelector((state) => state.spotify.artists);
  const [spotifySearched, setSpotifySearched] = useState(true);
  const [selectedSpotifyObject, setSelectedSpotifyObject] = useState({});
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedSpotifyObject);
    dispatch(
      createArtist(selectedSpotifyObject.name, selectedSpotifyObject.id)
    ); //rework createArtist to be based on spotifyId
  };

  const searchSpotifyHandler = (e) => {
    e.preventDefault();
    dispatch(clearSpotifySearch());
    setSpotifySearched(true);
    console.log(e);
    dispatch(searchSpotify(spotifyName, "artist"));
  };

  function populateSelectFromNewSearch() {
    setFormData({
      ...formData,
      selectedSpotifyArtist: spotifyArtists.data.artists.items[0].name,
    });
    setSelectedSpotifyObject(spotifyArtists.data.artists.items[0]);
    setSpotifySearched(false);
  }

  const onChangeSelect = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    const selectedIndex = e.target.options.selectedIndex;
    const objIndex = e.target.options[selectedIndex].getAttribute("data-key");
    setSelectedSpotifyObject(spotifyArtists.data.artists.items[objIndex]);
  };

  if (createdArtist) {
    return <Redirect to={`/artists/${createdArtist.slug}`} />;
  }

  return (
    <div className='create-artist__wrapper'>
      <form className='create-artist__form' onSubmit={(e) => onSubmit(e)}>
        <label>Search for Spotify Artist: </label>

        <div className='spotify-search'>
          <input
            type='text'
            name='spotifyName'
            value={spotifyName}
            placeholder='Artist Name'
            onChange={(e) => onChange(e)}
          />
          <button onClick={(e) => searchSpotifyHandler(e)}>
            Search Spotify
          </button>
        </div>
        <div>
          {spotifyArtists.length !== 0 && (
            <Fragment>
              <label>Select artist name: </label>
              <select
                name='selectedSpotifyArtist'
                placeholder='Artist name'
                onChange={(e) => onChangeSelect(e)}
                required
              >
                {spotifyArtists.length !== 0 &&
                  spotifyArtists.data.artists.items.map((artist, i) => (
                    <option key={i} data-key={i} name={artist.name}>
                      {artist.name}
                    </option>
                  ))}
              </select>

              {spotifySearched && populateSelectFromNewSearch()}
            </Fragment>
          )}
        </div>

        <input type='submit' value='Create Artist' />
      </form>
    </div>
  );
};

export default CreateArtist;
