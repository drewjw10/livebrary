import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSong } from "../../../actions/song";

const SongInfo = ({ match }) => {
  const song = useSelector((state) => state.song.song);
  const dispatch = useDispatch();

  const params = match.params;

  useEffect(() => {
    dispatch(getSong(params.id));
  }, []);

  return (
    <Fragment>
      {song && (
        <p>
          {song.name} - {song.artist}
        </p>
      )}
    </Fragment>
  );
};

export default SongInfo;
