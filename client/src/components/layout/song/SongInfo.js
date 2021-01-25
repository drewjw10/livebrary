import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSong } from "../../../actions/song";
import { getPerformances } from "../../../actions/performances";
import Spinner from "../Spinner";
import TopPerformanceTable from "../performance/TopPerformanceTable";
import { Breadcrumbs } from "@material-ui/core";
import { Link } from "react-router-dom";

const SongInfo = ({ match }) => {
  const user = useSelector((state) => state.auth.user);
  const song = useSelector((state) => state.song.song);
  const performances = useSelector(
    (state) => state.performance.performances.data
  );
  const loading = useSelector((state) => state.song.loading);
  const dispatch = useDispatch();

  const params = match.params;

  useEffect(() => {
    dispatch(getSong(params.slug, params.artist_slug));
    dispatch(getPerformances(user, params.slug));
  }, []);

  return (
    <Fragment>
      {song && (
        <div className='breadcrumb'>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link color='inherit' href='/'>
              {song.song.artist}
            </Link>
            <Link color='inherit' href='/getting-started/installation/'>
              {song.song.name}
            </Link>
          </Breadcrumbs>
        </div>
      )}

      {loading && <Spinner />}

      {performances && <TopPerformanceTable performances={performances} />}
    </Fragment>
  );
};

export default SongInfo;
