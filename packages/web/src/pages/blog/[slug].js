import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import gql from 'graphql-tag';

import PostView from '@components/Blog/PostView';
import { subString } from '@readerfront/shared';
import { APP_TITLE } from 'lib/config';
import { withApollo } from 'lib/apollo';
import { logException } from 'lib/analytics';

export const FIND_BY_STUB = gql`
  query PostByStub($stub: String) {
    postByStub(stub: $stub, showHidden: true) {
      id
      uniqid
      type
      title
      stub
      content
      category_name
      status
      sticky
      language
      thumbnail_path
      createdAt
      updatedAt
    }
  }
`;

export function BlogContainer() {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, error, data } = useQuery(FIND_BY_STUB, {
    variables: { stub: slug }
  });

  if (loading)
    return <div style={{ textAlign: 'center', padding: 100 }}>Loading...</div>;
  if (error) {
    logException(JSON.stringify(error), true);
    return <p id="error_blog">Error :(</p>;
  }

  return (
    <div className="Post">
      <MetaTagPost post={data.postByStub} />
      <PostView post={data.postByStub} />
    </div>
  );
}

const MetaTagPost = ({ post }) => {
  return (
    <Head>
      <title>{post.title + ' :: ' + APP_TITLE}</title>
      <meta property="og:title" content={post.title + ' :: ' + APP_TITLE} />
      <meta property="og:type" content="website" />
      <meta name="description" content={subString(post.content, 150)} />
      <meta name="og:description" content={subString(post.content, 150)} />
    </Head>
  );
};

export default withApollo(BlogContainer);
