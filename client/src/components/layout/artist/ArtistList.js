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
        artistList.map((artist, i) => {
          return (
            <p key={artist + i}>
              <Link to={`/artists/${artist.slug}`}>{artist.name}</Link>
            </p>
          );
        })}
    </Fragment>
  );
};

export default ArtistList;
