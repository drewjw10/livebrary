import React, { Fragment, useEffect } from "react";
import TopPerformanceTable from "./TopPerformanceTable";
import { getTopPerformances } from "../../../actions/performances";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";

const TopPerformances = () => {
  const performances = useSelector(
    (state) => state.performance.performances.data
  );
  const loading = useSelector((state) => state.performance.loading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopPerformances(user));
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      {performances && <TopPerformanceTable performances={performances} />}
    </Fragment>
  );
};

export default TopPerformances;
