import React from 'react';
const EndpointList = ({ isLoading, endpoints }) => {
  if (isLoading) return <div>Loading...</div>;

  const endpointElements = endpoints.map(e => <div>{e.name}</div>);
  return <>{endpointElements}</>;
};

export default EndpointList;
