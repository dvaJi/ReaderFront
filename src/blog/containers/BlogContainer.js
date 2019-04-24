import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { Container } from 'reactstrap';

// App imports
import { FETCH_ALL_POSTS_WITH_AGG, FIND_BY_STUB } from './queries';
import { MetaTagList, MetaTagPost } from './BlogMetatag';
import PostsList from '../components/PostsList';
import PostView from '../components/PostView';
import PostCardLoading from '../components/PostCardEmpty';
import { languageNameToId } from '../../utils/common';

class BlogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 9,
      postSelected: null
    };

    this.handleSelectPost = this.handleSelectPost.bind(this);
    this.handleDeselectPost = this.handleDeselectPost.bind(this);
  }

  handleSelectPost(e) {
    this.setState({ postSelected: e });
  }

  handleDeselectPost() {
    this.setState({ postSelected: null });
  }

  renderPost() {
    const { match } = this.props;
    return (
      <div className="Post">
        <Query
          query={FIND_BY_STUB}
          variables={{
            stub: match.params.stub
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
                <PostView
                  post={data.postByStub}
                  onClickBack={this.handleDeselectPost}
                />
              </>
            );
          }}
        </Query>
      </div>
    );
  }

  renderPostsList() {
    const { perPage } = this.state;
    const { language } = this.props;
    return (
      <Container className="Blog">
        <MetaTagList />
        <Query
          query={FETCH_ALL_POSTS_WITH_AGG}
          variables={{
            first: perPage,
            offset: 0,
            language: languageNameToId(language)
          }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (loading) return <PostCardLoading />;
            if (error)
              return (
                <p id="error_blog">
                  <PostCardLoading />
                </p>
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
                doSelect={this.handleSelectPost}
              />
            );
          }}
        </Query>
      </Container>
    );
  }

  render() {
    const { match } = this.props;
    return match.params.stub !== undefined
      ? this.renderPost()
      : this.renderPostsList();
  }
}

const mapStateToProps = state => {
  return {
    language: state.layout.language
  };
};

export default connect(mapStateToProps)(BlogContainer);
