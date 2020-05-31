import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSong } from "../../../actions/song";
import Spinner from "../Spinner";

const SongInfo = ({ match }) => {
  const song = useSelector((state) => state.song.song);
  const loading = useSelector((state) => state.song.loading);
  const dispatch = useDispatch();

  const params = match.params;

  useEffect(() => {
    dispatch(getSong(params.slug, params.artist_slug));
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      {song && (
        <p>
          {song.song.name} - {song.song.artist}
        </p>
      )}

      <div className='perf-list'>
        {song &&
          song.performances.map((performance, i) => {
            return (
              <div className='perf-list-item'>
                <img src={performance.thumbnail} />
                <a
                  key={performance.venue + i}
                  href={performance.link}
                  target='_new'
                  className='list-item-link'
                >
                  {performance.venue}
                </a>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

export default SongInfo;
