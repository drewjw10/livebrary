import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <Fragment>
      <Link to='/artists'>
        <p>See a list of artists</p>
      </Link>
      <Link to='/create-artist'>
        <button className='create-object'>Create Artist</button>
      </Link>
      <Link to='/create-song'>
        <button className='create-object'>Create Song</button>
      </Link>
      <Link to='/create-performance'>
        <button className='create-object'>Create Performance</button>
      </Link>
    </Fragment>
  );
};

export default Search;
