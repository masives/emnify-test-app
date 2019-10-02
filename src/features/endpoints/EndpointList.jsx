import React from 'react';
import PaginatedTable from './PaginatedTable';
import Paper from '@material-ui/core/Paper';
import './index.scss';

const EndpointList = ({
  isLoading,
  endpoints,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  count,
}) => {
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={'endpoint-list'}>
      <PaginatedTable
        rows={endpoints}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        count={count}
      />
    </div>
  );
};

export default EndpointList;
