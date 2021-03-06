import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSong } from "../../../actions/song";
import {
  getPerformances,
  clearPerformanceState,
} from "../../../actions/performances";
import Spinner from "../Spinner";
import TopPerformanceTableSplit from "../performance/TopPerformanceTableSplit";
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

    return () => {
      dispatch(clearPerformanceState());
    };
  }, []);

  return (
    <Fragment>
      {song && (
        <div className='breadcrumb'>
          <div className='breadcrumb-path'>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link color='inherit' to='/artists'>
                Artists
              </Link>
              <Link color='inherit' to={`/artists/${params.artist_slug}`}>
                {song.song.artist}
              </Link>
              <Link color='inherit'>{song.song.name}</Link>
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
          <TopPerformanceTableSplit performanceList={performanceList} />
        )}
      </div>
    </Fragment>
  );
};

export default SongInfo;
