import React from 'react';
import { FormattedMessage } from 'react-intl';

function ErrorNotFound() {
  return (
    <div class="col-md-12 p-lg-5 mx-auto my-5">
      <h1 class="display-4 font-weight-normal">
        <FormattedMessage id="error_not_found" defaultMessage="Not Found" />
      </h1>
      <p class="lead font-weight-normal">
        <FormattedMessage
          id="error_not_found_description"
          defaultMessage="This link you followed probably broken or the page has been removed."
        />
      </p>
    </div>
  );
}

export default ErrorNotFound;
