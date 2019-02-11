import React from 'react';
import { FormattedMessage } from 'react-intl';
import { APP_TITLE } from '../../config';
import { Helmet } from 'react-helmet';

const MetaTag = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
      </Helmet>
      <FormattedMessage
        id="releases.title"
        defaultMessage="Latest releases :: {title}"
        values={{ title: APP_TITLE }}
      >
        {title => (
          <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
          </Helmet>
        )}
      </FormattedMessage>
      <FormattedMessage
        id="releases.desc"
        defaultMessage="Latest releases by {title}"
        values={{ title: APP_TITLE }}
      >
        {desc => (
          <Helmet>
            <meta name="description" content={desc} />
            <meta property="og:description" content={desc} />
          </Helmet>
        )}
      </FormattedMessage>
    </>
  );
};

export default MetaTag;
