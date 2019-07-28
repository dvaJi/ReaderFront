import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Query, graphql } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// App imports
import PostForm from './Form';
import { Card, ButtonLink, Container } from 'common/ui';
import { MetaTagEdit } from '../ABlogMetatag';
import { FIND_BY_STUB, FETCH_ALL_POSTS_WITH_AGG } from '../queries';
import { UPDATE_POST } from '../mutations';

class EditPost extends Component {
  onSubmit = async (event, post) => {
    event.preventDefault();

    await this.props.mutate({
      variables: { ...post },
      refetchQueries: [
        {
          query: FETCH_ALL_POSTS_WITH_AGG,
          variables: { first: 20, offset: 0 }
        }
      ]
    });

    this.props.history.push('/admincp/blog/manage');
  };

  render() {
    const { match } = this.props;
    return (
      <Container>
        <MetaTagEdit />
        <div style={{ marginTop: '1rem' }}>
          <ButtonLink to={'/admincp/blog/manage'}>
            <FontAwesomeIcon icon={faArrowLeft} />{' '}
            <FormattedMessage id="go_back" defaultMessage="Go back" />
          </ButtonLink>
        </div>
        <Card>
          <h4>
            <FormattedMessage id="edit" defaultMessage="Edit" />{' '}
            <FormattedMessage id="post" defaultMessage="Post" />
          </h4>
          <Query query={FIND_BY_STUB} variables={{ stub: match.params.stub }}>
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <div>
                    <FormattedMessage
                      id="loading"
                      defaultMessage="Loading..."
                    />
                  </div>
                );
              if (error) return <p id="error_edit_post">Error :(</p>;
              return (
                <div>
                  <MetaTagEdit postTitle={data.postByStub.title} />
                  <PostForm
                    post={data.postByStub}
                    onSubmit={this.onSubmit}
                    intl={this.props.intl}
                  />
                </div>
              );
            }}
          </Query>
        </Card>
      </Container>
    );
  }
}

export default graphql(UPDATE_POST)(injectIntl(withRouter(EditPost)));
