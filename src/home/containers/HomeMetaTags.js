import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as config from '../../config';
import { Helmet } from 'react-helmet';

const MetaTag = () => {
  const title = config.APP_TITLE;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <FormattedMessage
        id="home.title"
        defaultMessage="{title} - Home"
        values={{ title: title }}
      >
        {title => (
          <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
          </Helmet>
        )}
      </FormattedMessage>
      <FormattedMessage id="home.desc" defaultMessage="All releases">
        {desc => (
          <Helmet>
            <meta name="description" content={desc} />
          </Helmet>
        )}
      </FormattedMessage>
    </>
  );
};

export default MetaTag;
