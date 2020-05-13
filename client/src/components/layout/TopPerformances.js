import React, { Fragment, useEffect, useState } from "react";
import PerformanceTable from "./PerformanceTable";
import { getTopPerformances } from "../../actions/performances";
import PropTypes from "prop-types";
import axios from "axios";

const TopPerformances = () => {
  let [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/performances/top");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      {data.data && <PerformanceTable performances={data.data} />}
    </Fragment>
  );
};

export default TopPerformances;
