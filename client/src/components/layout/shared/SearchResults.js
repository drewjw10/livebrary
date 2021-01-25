import React from "react";

import { Link } from "react-router-dom";

const SearchResults = (props) => {
  const { searchText, artistResults, songResults } = props;

  return (
    <div className='search-results'>
      {artistResults.length !== 0 && <h3>Artists:</h3>}
      {artistResults.map((result) => {
        let resultText = result[0];
        let startIndex = resultText
          .toLowerCase()
          .indexOf(searchText.toLowerCase());
        return (
          <p key={result[1]}>
            <Link className='link' to={`/artists/${result[1]}`}>
              {resultText.slice(0, startIndex)}
              <span class='search-result'>
                {resultText.slice(startIndex, startIndex + searchText.length)}
              </span>
              {resultText.slice(startIndex + searchText.length)}
            </Link>
          </p>
        );
      })}

      {songResults.length !== 0 && <h3>Songs:</h3>}

      {songResults.map((result) => {
        let resultText = result[0];
        let startIndex = resultText
          .toLowerCase()
          .indexOf(searchText.toLowerCase());
        return (
          <p key={result[1]}>
            <Link className='link' to={`/artists/${result[2]}/${result[1]}`}>
              {resultText.slice(0, startIndex)}
              <span class='search-result'>
                {resultText.slice(startIndex, startIndex + searchText.length)}
              </span>
              {resultText.slice(startIndex + searchText.length)}
            </Link>
          </p>
        );
      })}
    </div>
  );
};

export default SearchResults;
