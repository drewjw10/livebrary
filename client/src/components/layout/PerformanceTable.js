import React, { Fragment } from "react";

const PerformanceTable = (performances) => {
  return (
    <Fragment>
      <table className='performance-table'>
        <tr>
          <th>Artist</th>
          <th>Song</th>
          <th>Venue</th>
          <th>User</th>
          <th>Votes</th>
        </tr>
        {console.log(performances)}
        {performances.performances &&
          performances.performances.map((performance) => (
            <tr key={performances.performances.indexOf(performance)}>
              <td>
                {performances.performances.indexOf(performance) + 1}{" "}
                {performance.artist}
              </td>
              <td>{performance.song}</td>
              <td>{performance.performance}</td>
              <td>{performance.user}</td>
              <td>VoteCount</td>
            </tr>
          ))}
      </table>
    </Fragment>
  );
};

export default PerformanceTable;
