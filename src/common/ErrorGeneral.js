import React from 'react';
import { useIntl } from 'react-intl';

function ErrorGeneral() {
  const { formatMessage: f } = useIntl();
  return (
    <div className="col-md-12 p-lg-5 mx-auto my-5">
      <h1 className="display-4 font-weight-normal">
        {f({ id: 'error_general', defaultMessage: 'Internal Server Error' })}
      </h1>
      <p className="lead font-weight-normal">
        {f({
          id: 'error_general_description',
          defaultMessage:
            'Oops. something went wrong. Try to refresh this page or feel free to contact us if the problem persists.'
        })}
      </p>
    </div>
  );
}

export default ErrorGeneral;
