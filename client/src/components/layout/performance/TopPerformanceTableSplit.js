import React, { Fragment, useState } from "react";
import smiley from "./smiley.png";
import frowny from "./frowny.png";
import VoteBlock from "./VoteBlock";
import Pagination from "../shared/Pagination";
import PerformanceEntry from "./PerformanceEntry";

const TopPerformanceTableSplit = (props) => {
  const { performanceList } = props;

  const [performanceVotes, setPerformanceVotes] = useState(
    performanceList.map((performance) => performance.votesCount)
  );

  let stateManagers = {
    performanceVotes: performanceVotes,
    setPerformanceVotes: setPerformanceVotes,
  };
  return (
    <Fragment>
      {performanceList && (
        <Pagination
          data={performanceList}
          stateManagers={stateManagers}
          RenderComponent={PerformanceEntry}
          pageLimit="5"
          dataLimit="4"
        />
      )}
    </Fragment>

    // Original working implementation, commented out to test Pagination
    // <Fragment>
    //   {performanceList &&
    //     performanceList.map((performance, i) => {
    //       return (
    //         <div className='perf-list-wrapper'>
    //           <h1 className='perf-list-wrapper__num'>{i + 1}. </h1>
    //           <div className='perf-list-item'>
    //             <div className='perf-list-left'>
    //               {/* <div
    //                 className='perf-list-img'
    //                 style={{
    //                   backgroundImage: `url("${performance.thumbnail}")`,
    //                   backgroundRepeat: "no-repeat",
    //                   backgroundPosition: "center",
    //                 }}
    //               ></div> */}
    //               <div className='perf-list-img__wrapper'>
    //                 <img
    //                   src={performance.thumbnail}
    //                   className='perf-list-img'
    //                 ></img>
    //               </div>
    //               <div className='top-perf-table-body'>
    //                 <p>
    //                   <a
    //                     key={performance.venue + i}
    //                     href={performance.link}
    //                     target='_new'
    //                     className='list-item-link'
    //                   >
    //                     {performance.artist} - {performance.song}
    //                   </a>
    //                 </p>

    //                 <p>Venue: @ {performance.venue}</p>
    //               </div>
    //               <div className='top-perf-table-votes'>
    //                 <VoteBlock
    //                   performance={performance}
    //                   index={i}
    //                   performanceVotes={performanceVotes}
    //                   setPerformanceVotes={setPerformanceVotes}
    //                 />
    //               </div>
    //             </div>
    //             <div className='perf-list-right'>
    //               <h4>Submitted by: {performance.user} </h4>
    //               <p>{performance.description}</p>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    // </Fragment>
  );
};

export default TopPerformanceTableSplit;
