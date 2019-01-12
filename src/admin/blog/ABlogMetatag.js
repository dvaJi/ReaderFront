import React from 'react';
import { FormattedMessage } from 'react-intl';
import { APP_TITLE } from '../../config';
import { Helmet } from 'react-helmet';

export const MetaTagList = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <FormattedMessage
        id="blog.title"
        defaultMessage="{title} - All posts"
        values={{ title: APP_TITLE }}
      >
        {title => (
          <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
          </Helmet>
        )}
      </FormattedMessage>
    </>
  );
};

export const MetaTagCreate = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <FormattedMessage
        id="blog.create.title"
        defaultMessage="{title} - Create post"
        values={{ title: APP_TITLE }}
      >
        {title => (
          <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
          </Helmet>
        )}
      </FormattedMessage>
    </>
  );
};

export const MetaTagEdit = ({ postTitle = '' }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <FormattedMessage
        id="blog.create.title"
        defaultMessage="{title} - Edit {postTitle}"
        values={{ title: APP_TITLE, postTitle }}
      >
        {title => (
          <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
          </Helmet>
        )}
      </FormattedMessage>
    </>
  );
};
