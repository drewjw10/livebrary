import React, { Fragment, useEffect } from "react";
import TopPerformanceTable from "./TopPerformanceTable";
import { getTopPerformances } from "../../../actions/performances";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";

const TopPerformances = () => {
  const performances = useSelector(
    (state) => state.performance.topPerformances.data
  );
  const loading = useSelector((state) => state.performance.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopPerformances());
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      {console.log(performances)}
      {performances && <TopPerformanceTable performances={performances} />}
    </Fragment>
  );
};

export default TopPerformances;
