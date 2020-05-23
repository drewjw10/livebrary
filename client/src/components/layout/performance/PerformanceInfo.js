import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPerformance } from "../../../actions/performances";

const PerformanceInformation = (match) => {
  const performance = useSelector((state) => state.performance.performance);
  const dispatch = useDispatch();
  let params = match.params;

  useEffect(() => {
    dispatch(getPerformance(params.id));
  }, []);

  return <Fragment>{performance && <p>{performance.venue}</p>}</Fragment>;
};

export default PerformanceInformation;
