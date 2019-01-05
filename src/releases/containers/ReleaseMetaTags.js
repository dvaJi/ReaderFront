import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as config from '../../config';
import { Helmet } from 'react-helmet';

const MetaTag = () => {
  const title = config.APP_TITLE;
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <FormattedMessage
        id="releases.title"
        defaultMessage="{title} - All chapters"
        values={{ title: title }}
      >
        {title => (
          <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
          </Helmet>
        )}
      </FormattedMessage>
      <FormattedMessage id="releases.desc" defaultMessage="All releases">
        {desc => (
          <Helmet>
            <meta name="description" content={desc} />
          </Helmet>
        )}
      </FormattedMessage>
    </div>
  );
};

export default MetaTag;
