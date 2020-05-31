import React, { Fragment, useState } from "react";
import { createArtist } from "../../../actions/artist";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const CreateArtist = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const name = formData.name;

  const createdArtist = useSelector((state) => state.artist.createdArtist);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createArtist(name));
  };

  if (createdArtist) {
    return <Redirect to={`/artists/${createdArtist.slug}`} />;
  }

  return (
    <Fragment>
      <form className='create-artist' onSubmit={(e) => onSubmit(e)}>
        <label>Artist name: </label>
        <input
          type='text'
          name='name'
          value={name}
          placeholder='Artist Name'
          onChange={(e) => onChange(e)}
          required
        />
        <input type='submit' value='Create Artist' />
      </form>
    </Fragment>
  );
};

export default CreateArtist;
