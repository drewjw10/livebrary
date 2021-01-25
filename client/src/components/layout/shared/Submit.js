import React from "react";

import { Link } from "react-router-dom";

const Submit = () => {
  return (
    <div>
      <h2>Submit a new artist, song, or performance.</h2>

      <Link to='/create-artist'>
        <button className='create-object'>Create Artist</button>
      </Link>
      <Link to='/create-song'>
        <button className='create-object'>Create Song</button>
      </Link>
      <Link to='/create-performance'>
        <button className='create-object'>Create Performance</button>
      </Link>
    </div>
  );
};

export default Submit;
