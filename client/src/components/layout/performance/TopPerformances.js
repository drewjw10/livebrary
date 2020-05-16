import React, { Fragment, useEffect } from "react";
import PerformanceTable from "./PerformanceTable";
import { getTopPerformances } from "../../../actions/performances";
import { useDispatch, useSelector } from "react-redux";

const TopPerformances = () => {
  const performances = useSelector(
    (state) => state.performance.topPerformances.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopPerformances());
  }, []);

  return (
    <Fragment>
      {console.log(performances)}
      {performances && <PerformanceTable performances={performances} />}
    </Fragment>
  );
};

export default TopPerformances;
