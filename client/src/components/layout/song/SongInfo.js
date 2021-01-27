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
  const performanceList = useSelector(
    (state) => state.performance.performanceList.data
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
          <div className='breadcrumb-path'>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link color='inherit' href='/'>
                {song.song.artist}
              </Link>
              <Link color='inherit' href='/getting-started/installation/'>
                {song.song.name}
              </Link>
            </Breadcrumbs>
          </div>

          <Link to='/create-performance'>
            <button type='button'>Submit New Performance</button>
          </Link>
        </div>
      )}

      {loading && <Spinner />}

      <div>
        {performanceList && (
          <TopPerformanceTable performanceList={performanceList} />
        )}
      </div>
    </Fragment>
  );
};

export default SongInfo;
