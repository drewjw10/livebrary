import React, { Fragment, useState } from "react";
import { votePerformance } from "../../../actions/performances";
import { useSelector, useDispatch } from "react-redux";
import smiley from "./smiley.png";
import frowny from "./frowny.png";
import Spinner from "../Spinner";

const VoteBlock = (props) => {
  let { performance, index, performanceVotes, setPerformanceVotes } = props;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <img
        src={smiley}
        onClick={(e) =>
          vote(
            e,
            1,
            performance,
            isAuthenticated,
            dispatch,
            index,
            performanceVotes,
            setPerformanceVotes
          )
        }
      />
      <p> {performanceVotes[index]} Votes</p>

      <img
        src={frowny}
        onClick={(e) =>
          vote(
            e,
            -1,
            performance,
            isAuthenticated,
            dispatch,
            index,
            performanceVotes,
            setPerformanceVotes
          )
        }
      />
    </Fragment>
  );
};

const vote = (
  e,
  voteType,
  performance,
  isAuthenticated,
  dispatch,
  index,
  performanceVotes,
  setPerformanceVotes
) => {
  e.preventDefault();
  if (isAuthenticated) {
    let voteValue = 0;
    switch (performance.userVote) {
      case -1:
        if (voteType === 1 || voteType === 0) voteValue = -1;
        else if (voteType === -1) voteValue = 0;
      case 1:
        if (voteType === -1 || voteType === 0) voteValue = 1;
        else if (voteType === 1) voteValue = 0;
      case 0:
        voteValue = voteType;
    }
    console.log(`User vote: ${performance.userVote}`);
    console.log(voteValue);
    setPerformanceVotes([
      ...performanceVotes.slice(0, index),
      voteValue,
      ...performanceVotes.slice(index + 1),
    ]);
    dispatch(votePerformance(performance.id, voteValue, index));
  }
  // Tell user to log in if not authenticated
};

export default VoteBlock;
