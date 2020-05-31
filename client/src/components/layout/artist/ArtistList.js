import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArtistList } from "../../../actions/artist";
import { Link } from "react-router-dom";

const ArtistList = () => {
  const artistList = useSelector((state) => state.artist.artistList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistList());
  }, []);

  return (
    <Fragment>
      <h2>Artists</h2>
      {artistList &&
        Object.keys(artistList).map((letter, i) => {
          return artistList[letter].map((artist, j) => {
            return (
              <p key={artist + j}>
                {j === 0 ? <h3>{letter}</h3> : ""}
                <Link to={`/artists/${artist.slug}`} className='list-item-link'>
                  {artist.name}
                </Link>
              </p>
            );
          });
        })}
    </Fragment>
  );
};

export default ArtistList;
