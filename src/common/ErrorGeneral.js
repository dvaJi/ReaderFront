import React from 'react';
import { FormattedMessage } from 'react-intl';

function ErrorGeneral() {
  return (
    <div class="col-md-12 p-lg-5 mx-auto my-5">
      <h1 class="display-4 font-weight-normal">
        <FormattedMessage
          id="error_general"
          defaultMessage="Internal Server Error"
        />
      </h1>
      <p class="lead font-weight-normal">
        <FormattedMessage
          id="error_general_description"
          defaultMessage="Oops. something went wrong. Try to refresh this page or feel free to contact us if the problem persists."
        />
      </p>
    </div>
  );
}

export default ErrorGeneral;
