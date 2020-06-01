import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
import { Container } from 'reactstrap';
import { Helmet } from 'react-helmet';
import gql from 'graphql-tag';

import PostsList from '@components/Blog/PostsList';
import PostCardLoading from '@components/Blog/PostCardEmpty';
import { APP_TITLE } from 'lib/config';
import { withApollo } from 'lib/apollo';
import { useGlobalState } from 'lib/state';

export const FETCH_ALL_POSTS_WITH_AGG = gql`
  query AllPosts($languages: [Int], $first: Int, $offset: Int) {
    posts(
      languages: $languages
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
      category_name
      status
      sticky
      language
      language_name
      thumbnail_path
      createdAt
      updatedAt
    }

    postsAggregates(
      languages: $languages
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
  const [languagesSelected] = useGlobalState('languages_filter');
  const languages = languagesSelected.map(l => l.value);

  return (
    <>
      <MetaTagList />
      <RenderPostList languages={languages} />
    </>
  );
}

function RenderPostList({ languages }) {
  const { loading, error, data, fetchMore } = useQuery(
    FETCH_ALL_POSTS_WITH_AGG,
    {
      variables: { first: PER_PAGE, offset: 0, languages }
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
