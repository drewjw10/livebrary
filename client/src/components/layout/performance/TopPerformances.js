import React, { Fragment, useEffect } from "react";
import TopPerformanceTable from "./TopPerformanceTable";
import TopPerformanceTableSplit from "./TopPerformanceTableSplit";
import {
  getTopPerformances,
  clearPerformanceState,
} from "../../../actions/performances";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";

const TopPerformances = () => {
  const performanceList = useSelector(
    (state) => state.performance.performanceList.data
  );
  const loading = useSelector((state) => state.performance.loading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopPerformances(user));
    return () => {
      dispatch(clearPerformanceState());
    };
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      {performanceList && (
        // Commented out to test split format: <TopPerformanceTable performanceList={performanceList} />
        <TopPerformanceTableSplit performanceList={performanceList} />
      )}
    </Fragment>
  );
};

export default TopPerformances;
