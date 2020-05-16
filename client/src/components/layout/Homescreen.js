import React, { Fragment, useEffect } from "react";
import PerformanceCard from "./performance/PerformanceCard";
import { useSelector, useDispatch } from "react-redux";
import { getRecentPerformances } from "../../actions/performances";

const Homescreen = () => {
  const performances = useSelector(
    (state) => state.performance.recentPerformances.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecentPerformances());
  }, []);

  return (
    <Fragment>
      <div className='welcome-box'>
        <h2>Welcome to Livebrary</h2>
        <p>
          Find live performances of your favorite songs from your favorite
          artists! Search by song or artist, or link spotify account for a
          curated list of performances!
        </p>
      </div>

      <div className='perf-boxes'>
        {performances &&
          performances.map(({ performance, song, artist, user }) => (
            <PerformanceCard
              venue={performance}
              song={song}
              artist={artist}
              user={user}
            ></PerformanceCard>
          ))}
      </div>
    </Fragment>
  );
};

export default Homescreen;
