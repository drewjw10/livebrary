import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArtist } from "../../../actions/artist";

const ArtistInfo = ({ match }) => {
  const artist = useSelector((state) => state.artist.artist);
  const dispatch = useDispatch();

  let params = match.params;

  useEffect(() => {
    console.log(params);
    dispatch(getArtist(params.id));
  }, []);

  return <Fragment>{artist && <p>{artist.name}</p>}</Fragment>;
};

export default ArtistInfo;
