import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArtist } from "../../../actions/artist";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

const ArtistInfo = ({ match }) => {
  const artist = useSelector((state) => state.artist.artist);
  const loading = useSelector((state) => state.artist.loading);
  const dispatch = useDispatch();

  let params = match.params;

  useEffect(() => {
    dispatch(getArtist(params.slug));
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      <div className='artist-header'>
        <div className='artist-header-text'>
          {!loading && artist && (
            <h2 className='info-header'>{artist.artist.name}</h2>
          )}
        </div>
        <Link to='/create-song'>
          <button type='button'>Submit New Song</button>
        </Link>
      </div>
      {!loading &&
        artist &&
        artist.songs.map((song, i) => {
          return (
            <Link
              to={`/artists/${artist.artist.slug}/${song.slug}`}
              className='list-item-link'
            >
              <p key={song + i}>{song.name}</p>
            </Link>
          );
        })}
    </Fragment>
  );
};

export default ArtistInfo;
