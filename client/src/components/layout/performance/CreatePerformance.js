import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPerformance } from "../../../actions/performances";
import { getArtistList } from "../../../actions/artist";
import { Redirect } from "react-router-dom";

const CreatePerformance = () => {
  const [formData, setFormData] = useState({
    song: "",
    artist: "",
    venue: "",
    link: "",
  });

  const { song, artist, venue, link } = formData;

  const createdPerformance = useSelector(
    (state) => state.performance.createdPerformance
  );

  const artistList = useSelector((state) => state.artist.artistList);
  const loading = useSelector((state) => state.artist.loading);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createPerformance(song, artist, venue, link));
  };

  useEffect(() => {
    dispatch(getArtistList());
  }, []);

  if (createdPerformance) {
    return (
      <Redirect
        to={`/artists/${createdPerformance.artist_slug}/${createdPerformance.song_slug}`}
      />
    );
  }

  return (
    <form className='create-performance' onSubmit={(e) => onSubmit(e)}>
      <label>Artist List</label>
      <select name='artist-list'>
        {!loading &&
          Object.keys(artistList).map((letter) => {
            return artistList[letter].map((artist) => {
              return <option key={artist.name}>{artist.name}</option>;
            });
          })}
      </select>
      <label>Song name: </label>
      <input
        type='text'
        name='song'
        value={song}
        onChange={(e) => onChange(e)}
      />
      <label>Artist: </label>
      <input
        type='text'
        name='artist'
        value={artist}
        onChange={(e) => onChange(e)}
      />
      <label>Venue: </label>
      <input
        type='text'
        name='venue'
        value={venue}
        onChange={(e) => onChange(e)}
      />
      <label>Link: </label>
      <input
        type='text'
        name='link'
        value={link}
        onChange={(e) => onChange(e)}
      />
      <input type='submit' value='Create Performance' />
    </form>
  );
};

export default CreatePerformance;
