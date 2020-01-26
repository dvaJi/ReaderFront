import React from 'react';
import { useIntl } from 'react-intl';

function ErrorNotFound() {
  const { formatMessage } = useIntl();
  return (
    <div className="col-md-12 p-lg-5 mx-auto my-5">
      <h1 className="display-4 font-weight-normal">
        {formatMessage({
          id: 'error_unauthorized',
          defaultMessage: 'Unauthorized'
        })}
      </h1>
      <p className="lead font-weight-normal">
        {formatMessage({
          id: 'error_unauthorized_description',
          defaultMessage: 'You are not authorized to visit this page.'
        })}
      </p>
    </div>
  );
}

export default ErrorNotFound;
