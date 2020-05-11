import React, { Fragment, useEffect } from "react";
import { getTopPerformances } from "../../actions/performances";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const TopPerformances = ({
  getTopPerformances,
  performance: { performances },
}) => {
  useEffect(() => {
    getTopPerformances();
  }, []);
  return (
    <Fragment>
      <div className='top-performances'>
        {performances.map((performance) => (
          <p>{performance.venue}</p>
        ))}
      </div>
    </Fragment>
  );
};

TopPerformances.propTypes = {
  getTopPerformances: PropTypes.func.isRequired,
  performances: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  performance: state.performance,
});

export default connect(mapStateToProps, { getTopPerformances })(
  TopPerformances
);
