import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
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

function BlogContainer({ language }) {
  const [postSelected, setPostSelected] = useState(null);
  const { stub } = useParams();

  return stub !== undefined || postSelected ? (
    <RenderPostDetail
      stub={stub}
      postSelected={postSelected}
      onDeselect={() => setPostSelected(null)}
    />
  ) : (
    <RenderPostList
      language={language}
      onSelect={post => setPostSelected(post)}
    />
  );
}

function RenderPostDetail({ stub, postSelected, onDeselect }) {
  return postSelected ? (
    <>
      <MetaTagPost post={postSelected} />
      <PostView post={postSelected} onClickBack={onDeselect} />
    </>
  ) : (
    <div className="Post">
      <Query
        query={FIND_BY_STUB}
        variables={{
          stub
        }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div style={{ textAlign: 'center', padding: 100 }}>
                Loading...
              </div>
            );
          if (error) return <p id="error_blog">Error :(</p>;
          return (
            <>
              <MetaTagPost post={data.postByStub} />
              <PostView post={data.postByStub} onClickBack={onDeselect} />
            </>
          );
        }}
      </Query>
    </div>
  );
}

function RenderPostList({ language, onSelect }) {
  return (
    <Container className="Blog">
      <MetaTagList />
      <Query
        query={FETCH_ALL_POSTS_WITH_AGG}
        variables={{
          first: PER_PAGE,
          offset: 0,
          language
        }}
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <PostCardLoading />;
          if (error)
            return (
              <div id="error_blog">
                <PostCardLoading />
              </div>
            );
          return (
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
          );
        }}
      </Query>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    language: languageNameToId(state.layout.language)
  };
};

export default connect(mapStateToProps)(BlogContainer);
