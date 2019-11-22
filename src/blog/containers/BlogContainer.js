import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
import { Container } from 'reactstrap';
import { useParams } from 'react-router-dom';

// App imports
import { FETCH_ALL_POSTS_WITH_AGG, FIND_BY_STUB } from './queries';
import { MetaTagList, MetaTagPost } from './BlogMetatag';
import PostsList from '../components/PostsList';
import PostView from '../components/PostView';
import PostCardLoading from '../components/PostCardEmpty';
import { languageNameToId } from 'utils/common';

const PER_PAGE = 9;

function BlogContainer() {
  const [postSelected, setPostSelected] = useState(null);
  const { locale } = useIntl();
  const language = languageNameToId(locale);
  const { stub } = useParams();

  return stub !== undefined || postSelected ? (
    <RenderPostDetail
      stub={stub}
      postSelected={postSelected}
      onDeselect={() => setPostSelected(null)}
    />
  ) : (
    <>
      <MetaTagList />
      <RenderPostList
        language={language}
        onSelect={post => setPostSelected(post)}
      />
    </>
  );
}

function RenderPostDetail({ stub, postSelected, onDeselect }) {
  const { loading, error, data } = useQuery(FIND_BY_STUB, {
    variables: { stub }
  });

  if (postSelected) {
    return (
      <div className="Post">
        <MetaTagPost post={postSelected} />
        <PostView post={postSelected} onClickBack={onDeselect} />
      </div>
    );
  }

  if (loading)
    return <div style={{ textAlign: 'center', padding: 100 }}>Loading...</div>;
  if (error) return <p id="error_blog">Error :(</p>;

  return (
    <div className="Post">
      <MetaTagPost post={data.postByStub} />
      <PostView post={data.postByStub} onClickBack={onDeselect} />
    </div>
  );
}

function RenderPostList({ language, onSelect }) {
  const { loading, error, data, fetchMore } = useQuery(
    FETCH_ALL_POSTS_WITH_AGG,
    {
      variables: { first: PER_PAGE, offset: 0, language }
    }
  );

  if (loading) return <PostCardLoading />;
  if (error)
    return (
      <div id="error_blog">
        <PostCardLoading />
      </div>
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
        doSelect={onSelect}
      />
    </Container>
  );
}

export default BlogContainer;
