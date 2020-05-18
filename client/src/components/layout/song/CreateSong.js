import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSong } from "../../../actions/song";
import { Redirect } from "react-router-dom";

const CreateSong = () => {
  const [formData, setFormData] = useState({
    name: "",
    artist: "",
  });

  const { name, artist } = formData;

  const createdSong = useSelector((state) => state.song.createdSong);
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

  if (createdSong) {
    return <Redirect to={`/songs/${createdSong._id}`} />;
  }

  return (
    <form className='create-song' onSubmit={(e) => onSubmit(e)}>
      <label>Song name: </label>
      <input
        type='text'
        name='name'
        value={name}
        placeholder='Song name'
        onChange={(e) => onChange(e)}
        required
      />
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
