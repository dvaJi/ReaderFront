import React from 'react';
import { useIntl } from 'react-intl';

function ErrorNotFound() {
  const { formatMessage } = useIntl();
  return (
    <div className="col-md-12 p-lg-5 mx-auto my-5">
      <h1 className="display-4 font-weight-normal">
        {formatMessage({ id: 'error_not_found', defaultMessage: 'Not Found' })}
      </h1>
      <p className="lead font-weight-normal">
        {formatMessage({
          id: 'error_not_found_description',
          defaultMessage:
            'This link you followed probably broken or the page has been removed.'
        })}
      </p>
    </div>
  );
}

export default ErrorNotFound;
