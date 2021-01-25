import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchObjects, clearSearch } from "../../../actions/performances";
import Spinner from "../Spinner";
import SearchResults from "../shared/SearchResults";

const Search = () => {
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const search = useSelector((state) => state.performance.search);
  const loading = useSelector((state) => state.performance.loading);

  const onKeyUp = (e) => {
    /* If backspace is held down, the final clearSearch happens quicky before the previously dispatched 
       searchObjects call is resolved. Therefore, do not dispatch searchObjects if key is backspace and length 
       of searchText is 1*/
    dispatch(clearSearch());
    console.log(e);
    if (e.target.value !== "" /* || (searchText.length === 0 && e.)*/)
      dispatch(searchObjects(searchText));
  };

  const onChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <Fragment>
      <Link to='/artists'>
        <p>See a list of artists</p>
      </Link>
      <input
        type='text'
        placeholder='Search..'
        value={searchText}
        onChange={(e) => onChange(e)}
        onKeyUp={(e) => onKeyUp(e)}
        className='search-input'
      ></input>
      <div class='search-box'>
        {loading && search === null && <Spinner />}
        {search && (
          <SearchResults
            searchFinished={search}
            searchText={searchText}
            artistResults={search["artists"]}
            songResults={search["songs"]}
          />
        )}
      </div>
    </Fragment>
  );
};

export default Search;
