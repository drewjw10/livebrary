import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArtist, clearArtistState } from "../../../actions/artist";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import { Breadcrumbs } from "@material-ui/core";

const ArtistInfo = ({ match }) => {
  const artist = useSelector((state) => state.artist.artist);
  const loading = useSelector((state) => state.artist.loading);
  const dispatch = useDispatch();

  let params = match.params;

  useEffect(() => {
    dispatch(getArtist(params.slug));

    return () => {
      dispatch(clearArtistState());
    };
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      {artist && (
        <div className='breadcrumb'>
          <div className='breadcrumb-path'>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link color='inherit' to='/artists'>
                Artists
              </Link>
              <Link color='inherit' to={`/artists/${params.artist_slug}`}>
                {artist.artist.name}
              </Link>
            </Breadcrumbs>
          </div>
          <Link to='/create-song'>
            <button type='button'>Submit New Song</button>
          </Link>
        </div>
      )}
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
