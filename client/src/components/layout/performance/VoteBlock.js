import React, { Fragment, useState } from "react";
import { votePerformance } from "../../../actions/performances";
import { useSelector, useDispatch } from "react-redux";
import smiley from "./smiley.png";
import frowny from "./frowny.png";
import Spinner from "../Spinner";

const VoteBlock = (props) => {
  let { performance, index, performanceVotes, setPerformanceVotes } = props;

  const [userVote, setUserVote] = useState(performance.userVote);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <img
        id='upvote'
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
            setPerformanceVotes,
            setUserVote
          )
        }
        className={userVote === 1 ? "voted" : ""}
      />
      <p> {performanceVotes[index]} Votes</p>

      <img
        id='downvote'
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
            setPerformanceVotes,
            setUserVote
          )
        }
        className={userVote === -1 ? "voted" : ""}
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
  setPerformanceVotes,
  setUserVote
) => {
  e.preventDefault();
  if (isAuthenticated) {
    // voteValue represents an upvote (1), downvote(-1), or no vote (0)
    let voteValue = 0;
    let voteTotal = performanceVotes[index];
    console.log(`original vote total: ${voteTotal}`);
    switch (performance.userVote) {
      case -1:
        if (voteType === 1) {
          voteValue = 1;
          setUserVote(1);
          performance.userVote = 1;
          voteTotal += 2;
        } else if (voteType === -1) {
          voteValue = 0;
          setUserVote(0);
          voteTotal += 1;
          performance.userVote = 0;
        }
        break;
      case 1:
        if (voteType === -1) {
          voteValue = -1;
          setUserVote(-1);
          voteTotal -= 2;
          performance.userVote = -1;
        } else if (voteType === 1) {
          voteValue = 0;
          setUserVote(0);
          voteTotal -= 1;
          performance.userVote = 0;
        }
        break;
      case 0:
        console.log("Case 0 performance.userVote entered");
        voteValue = voteType;
        setUserVote(voteType);
        voteTotal += voteType;
        performance.userVote = voteType;
        break;
      default:
        console.log("Error - performance.userVote is invalid!");
    }
    // update the list of performance vote totals
    setPerformanceVotes([
      ...performanceVotes.slice(0, index),
      voteTotal,
      ...performanceVotes.slice(index + 1),
    ]);
    console.log(`new vote total: ${voteTotal}`);
    console.log(`dispatched request, voteValue: ${voteValue}`);
    dispatch(votePerformance(performance.id, voteValue, index));
  }

  // Tell user to log in if not authenticated
};

export default VoteBlock;
