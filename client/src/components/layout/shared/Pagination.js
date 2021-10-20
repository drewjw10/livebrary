import React, { useState } from "react";

import "./Pagination.css";

export default function Pagination({
  data,
  stateManagers,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
}) {
  const [pages] = useState(Math.ceil(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    if (currentPage !== 1) setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  console.log(pages);
  return (
    <div>
      <div className="dataContainer">
        {getPaginatedData().map((d, idx) => (
          <RenderComponent
            key={data.indexOf(d)}
            data={d}
            stateManagers={stateManagers}
            i={data.indexOf(d)}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={"prev"}
          disabled={currentPage === 1 ? "true" : ""}
        >
          prev
        </button>
        <button>{currentPage}</button>
        <button
          onClick={goToNextPage}
          className="next"
          disabled={currentPage === pages ? "true" : ""}
        >
          next
        </button>
      </div>
    </div>
  );
}
