import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPerformance } from "../../../actions/performances";
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
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createPerformance(song, artist, venue, link));
  };

  if (createdPerformance) {
    return <Redirect to={`/performances/${createdPerformance._id}`} />;
  }

  return (
    <form className='create-performance' onSubmit={(e) => onSubmit(e)}>
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
