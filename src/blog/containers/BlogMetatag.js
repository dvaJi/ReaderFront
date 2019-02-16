import React from 'react';
import { FormattedMessage } from 'react-intl';

import { subString } from '../../utils/helpers';
import { APP_TITLE } from '../../config';
import { Helmet } from 'react-helmet';

export const MetaTagList = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{'Blog :: ' + APP_TITLE}</title>
        <meta property="og:title" content={'Blog :: ' + APP_TITLE} />
        <meta property="og:type" content="website" />
      </Helmet>
      <FormattedMessage
        id="blog.description"
        defaultMessage="All blog posts by {title}"
        values={{ title: APP_TITLE }}
      >
        {description => (
          <Helmet>
            <meta name="description" content={description} />
            <meta name="og:description" content={description} />
          </Helmet>
        )}
      </FormattedMessage>
    </>
  );
};

export const MetaTagPost = ({ post }) => {
  return (
    <>
      <Helmet>
        <title>{post.title + ' :: ' + APP_TITLE}</title>
        <meta property="og:title" content={post.title + ' :: ' + APP_TITLE} />
        <meta property="og:type" content="website" />
        <meta name="description" content={subString(post.content, 150)} />
        <meta name="og:description" content={subString(post.content, 150)} />
      </Helmet>
    </>
  );
};
