import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Results = ({ fakeData, setRecordsCount, recordsCount }) => {
  const handleSetRecordsCount = () => {
    setRecordsCount(recordsCount + 10);
  };
  return (
    <InfiniteScroll
      dataLength={fakeData.length}
      next={handleSetRecordsCount}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.address}</td>
              <td>{data.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default Results;
