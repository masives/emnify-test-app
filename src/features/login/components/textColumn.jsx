import React from 'react';

import { CheckCircleOutline } from '@material-ui/icons';
import './columns.scss';
const TextColumn = () => {
  return (
    <div className="login-page-text-column">
      <ul>
        <li>
          <CheckCircleOutline />
          See a bigger picture. Do more.   All your devices in one place.
        </li>
        <li>
          <CheckCircleOutline />
          Stay informed on everything that happens with your devices.
        </li>
        <li>
          <CheckCircleOutline />
          Debugging your connection has never been so easy.
        </li>
      </ul>
    </div>
  );
};

export default TextColumn;
