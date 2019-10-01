import React, { useEffect, useState } from 'react';
import EndpointList from './EndpointList';
import axios from 'axios';

const normalizeResult = e => ({
  id: e.id,
  name: e.name,
  isSim: !!e.sim,
  iccid: e.sim && e.sim.iccid,
  msisdn: e.sim && e.sim.msisdn,
  ip: e.ip_address,
  imei: e.imei,
  imeiLock: e.imei_lock,
  serviceProfile: e.service_profile && e.service_profile.name,
  tariffProfile: e.tariff_profile && e.tariff_profile.name,
  tags: e.tags,
  statusDescription: e.status && e.status.description,
});

const getEndpoints = async (page, rowsPerPage) => {
  const result = await axios
    .get('https://cdn.emnify.net/api/v1/endpoint', {
      params: {
        page: page + 1,
        per_page: rowsPerPage,
      },
    })
    .then(res => {
      return {
        data: res.data.map(normalizeResult),
        count: Number(res.headers['x-total-count']),
      };
    });
  return result;
  // 'x-total-count' from headers
};

const EndpointListContainer = () => {
  const [endpoints, setEndpoints] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    (async () => {
      const result = await getEndpoints(page, rowsPerPage);
      setEndpoints(result.data);
      setCount(result.count);
      setLoading(false);
    })();
  }, [page, rowsPerPage]);

  console.log(endpoints);

  return (
    <EndpointList
      isLoading={isLoading}
      endpoints={endpoints}
      page={page}
      rowsPerPage={rowsPerPage}
      setPage={setPage}
      setRowsPerPage={setRowsPerPage}
      count={count}
    />
  );
};

export default EndpointListContainer;
