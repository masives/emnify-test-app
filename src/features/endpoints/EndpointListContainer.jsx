import React, { useEffect, useState } from 'react';
import EndpointList from './EndpointList';

import axios from 'axios';

const getEndpoints = async () => {
  const result = await axios
    .get('https://cdn.emnify.net/api/v1/endpoint')
    .then(res => {
      console.log(res);
      return res.data.data;
    });
  return result;
};

const getEndpointsMockup = () => {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            id: 9282920,
            name: 'LG G6',
            tags: null,
            created: '2019-02-07T15:59:24.000+0000',
            last_updated: '2019-09-11T13:50:48.000+0000',
            status: { id: 0, description: 'Enabled' },
            service_profile: { id: 71305, name: 'Generic Service Profile' },
            tariff_profile: { id: 70535, name: 'Generic Tariff Profile' },
            sim: {
              id: 332733,
              iccid: '8988303000000121462',
              imsi: '295050999816476',
              msisdn: '423663950010976',
            },
            imei: '',
            ip_address: '10.197.128.1',
            ip_address_space: { id: 881 },
            imei_lock: false,
          },
          {
            id: 9329109,
            name: 'Test EP',
            tags: null,
            created: '2019-03-21T18:40:13.000+0000',
            last_updated: '2019-05-13T13:41:11.000+0000',
            status: { id: 0, description: 'Enabled' },
            service_profile: { id: 71305, name: 'Generic Service Profile' },
            tariff_profile: { id: 70535, name: 'Generic Tariff Profile' },
            imei: null,
            ip_address: '10.197.128.2',
            ip_address_space: { id: 881 },
            imei_lock: false,
          },
          {
            id: 9460064,
            name: 'Horst Tracker',
            tags: 'GPS Tracker',
            created: '2019-05-13T15:09:31.000+0000',
            last_updated: '2019-09-30T15:09:25.000+0000',
            status: { id: 0, description: 'Enabled' },
            service_profile: { id: 71305, name: 'Generic Service Profile' },
            tariff_profile: { id: 70535, name: 'Generic Tariff Profile' },
            sim: {
              id: 778823,
              iccid: '8988303000000285551',
              imsi: '295050999198004',
              msisdn: '423663910029064',
            },
            imei: '3593390754121278',
            ip_address: '10.197.128.3',
            ip_address_space: { id: 881 },
            imei_lock: true,
          },
          {
            id: 9759551,
            name: 'test',
            tags: null,
            created: '2019-10-01T08:51:32.000+0000',
            last_updated: '2019-10-01T08:51:32.000+0000',
            status: { id: 0, description: 'Enabled' },
            service_profile: { id: 302788, name: 'Test' },
            tariff_profile: { id: 277383, name: 'Test TP' },
            imei: null,
            ip_address: '10.197.128.4',
            ip_address_space: { id: 881 },
            imei_lock: false,
          },
        ]),
      1000,
    );
  });
};

const EndpointListContainer = () => {
  const [endpoints, setEndpoints] = useState([{ name: 'testEndpointName' }]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getEndpointsMockup();
      setEndpoints(result);
      setLoading(false);
    })();
  }, []);

  return <EndpointList isLoading={isLoading} endpoints={endpoints} />;
};

export default EndpointListContainer;
