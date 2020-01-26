import React, { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
import { Container } from 'reactstrap';
import { Helmet } from 'react-helmet';
import gql from 'graphql-tag';

import PostsList from '@components/Blog/PostsList';
import PostCardLoading from '@components/Blog/PostCardEmpty';
import { languageNameToId } from 'utils/common';
import { APP_TITLE } from 'lib/config';
import { withApollo } from 'lib/apollo';

export const FETCH_ALL_POSTS_WITH_AGG = gql`
  query AllPosts($language: Int, $first: Int, $offset: Int) {
    posts(
      language: $language
      orderBy: "DESC"
      sortBy: "createdAt"
      first: $first
      offset: $offset
      showHidden: false
    ) {
      id
      uniqid
      type
      title
      stub
      content
      user {
        name
      }
      category
      status
      sticky
      language
      thumbnail_path
      createdAt
      updatedAt
    }

    postsAggregates(
      language: $language
      aggregate: "COUNT"
      aggregateColumn: "id"
      showHidden: false
    ) {
      count
    }
  }
`;

const PER_PAGE = 9;

export function BlogContainer() {
  const { locale } = useIntl();
  const language = languageNameToId(locale);

  return (
    <>
      <MetaTagList />
      <RenderPostList language={language} />
    </>
  );
}

function RenderPostList({ language }) {
  const { loading, error, data, fetchMore } = useQuery(
    FETCH_ALL_POSTS_WITH_AGG,
    {
      variables: { first: PER_PAGE, offset: 0, language }
    }
  );

  if (loading)
    return (
      <Container>
        <PostCardLoading />
      </Container>
    );
  if (error)
    return (
      <Container id="error_blog">
        <PostCardLoading />
      </Container>
    );
  return (
    <Container className="Blog">
      <PostsList
        onLoadMore={() =>
          fetchMore({
            variables: {
              offset: data.posts.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (fetchMoreResult.posts.length === 0) return prev;
              return Object.assign({}, prev, {
                posts: prev.posts.concat(fetchMoreResult.posts)
              });
            }
          })
        }
        posts={data.posts}
        maxPosts={data.postsAggregates.count}
      />
    </Container>
  );
}

const MetaTagList = () => {
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

export default withApollo(BlogContainer);
