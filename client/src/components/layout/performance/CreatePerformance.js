import React from "react";

const CreatePerformance = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className='create-performance' onSubmit={(e) => onSubmit(e)}>
      <label>Song name: </label>
      <input type='text' name='song' value='' />
      <label>Artist: </label>
      <input type='text' name='artist' value='' />
      <label>Venue: </label>
      <input type='text' name='song' value='' />
      <input type='submit' value='Create Performance' />
    </form>
  );
};

export default CreatePerformance;
