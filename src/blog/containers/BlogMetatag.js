import React from 'react';
import { FormattedMessage } from 'react-intl';
import { APP_TITLE } from '../../config';
import { Helmet } from 'react-helmet';

export const MetaTagList = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{APP_TITLE + ' - Blog'}</title>
        <meta property="og:title" content={APP_TITLE + ' - Blog'} />
      </Helmet>
      <FormattedMessage id="blog.description" defaultMessage="All blog posts">
        {description => (
          <Helmet>
            <meta name="description" content={description} />
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
        <title>{post.title + ' - ' + APP_TITLE}</title>
        <meta property="og:title" content={post.title + ' - ' + APP_TITLE} />
      </Helmet>
      <FormattedMessage
        id="blog.post.description"
        defaultMessage="Reading {postTitle}"
        values={{ postTitle: post.title }}
      >
        {description => (
          <Helmet>
            <meta name="description" content={description} />
          </Helmet>
        )}
      </FormattedMessage>
    </>
  );
};
