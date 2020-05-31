import React, { Fragment, useEffect } from "react";
import PerformanceCard from "./performance/PerformanceCard";
import { useSelector, useDispatch } from "react-redux";
import { getRecentPerformances } from "../../actions/performances";
import Spinner from "./Spinner";

const Homescreen = () => {
  const performances = useSelector(
    (state) => state.performance.recentPerformances.data
  );
  const loading = useSelector((state) => state.performance.loading);
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
      {loading && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Spinner />
        </div>
      )}
      <div className='perf-boxes'>
        {!loading &&
          performances &&
          performances.map(
            ({ performance, song, artist, user, thumbnail, link }) => (
              <PerformanceCard
                venue={performance}
                song={song}
                artist={artist}
                user={user}
                thumbnail={thumbnail}
                link={link}
              ></PerformanceCard>
            )
          )}
      </div>
    </Fragment>
  );
};

export default Homescreen;
