import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArtist } from "../../../actions/artist";

const ArtistInfo = ({ match }) => {
  const artist = useSelector((state) => state.artist.artist);
  const dispatch = useDispatch();

  let params = match.params;

  useEffect(() => {
    console.log(params);
    dispatch(getArtist(params.slug));
  }, []);
  return (
    <Fragment>
      {console.log(artist)}
      {artist && <h2 className='info-header'>{artist.artist.name}</h2>}
      {artist &&
        artist.songs.map((song, i) => {
          return <p key={song + i}>{song.name}</p>;
        })}
    </Fragment>
  );
};

export default ArtistInfo;
