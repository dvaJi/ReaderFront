import React from 'react';
import { useQuery } from '@apollo/client';
import { Container } from 'reactstrap';
import Head from "next/head";
import gql from 'graphql-tag';

import useIntl from '@hooks/use-intl';

import PostsList from '@components/Blog/PostsList';
import PostCardLoading from '@components/Blog/PostCardEmpty';
import { APP_TITLE } from 'lib/config';
import { withApollo } from 'lib/apollo';
import { useGlobalState } from 'lib/state';
import { logException } from 'lib/analytics';

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

  if (error) {
    logException(JSON.stringify(error), true);
    return (
      <Container id="error_blog">
        <PostCardLoading />
      </Container>
    );
  }

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
  const { f } = useIntl();

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{'Blog :: ' + APP_TITLE}</title>
      <meta property="og:title" content={'Blog :: ' + APP_TITLE} />
      <meta property="og:type" content="website" />
      <meta name="description" content={f({ id: 'blog.description', defaultMessage: 'All blog posts by {title}', values: { title: APP_TITLE } })} />
      <meta name="og:description" content={f({ id: 'blog.description', defaultMessage: 'All blog posts by {title}', values: { title: APP_TITLE } })} />
    </Head>
  );
};

export default withApollo(BlogContainer);
