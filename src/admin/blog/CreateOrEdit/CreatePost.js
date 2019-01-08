import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// App imports
import PostForm from './Form';
import { Card } from '../../common/UI';
import { MetaTagCreate } from '../ABlogMetatag';
import { FETCH_ALL_POSTS_WITH_AGG } from '../queries';
import { CREATE_POST } from '../mutations';

const postEmpty = {
  id: 0,
  userId: 0,
  content: '',
  category: 0,
  uniqid: '',
  type: 0,
  title: '',
  stub: '',
  status: 0,
  sticky: false,
  language: 0,
  thumbnail: ''
};

class CreateOrEdit extends Component {
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
    return (
      <div className="container">
        <MetaTagCreate />
        <Card>
          <Container>
            <Link to={'/admincp/blog/manage'}>
              <Button>
                <FontAwesomeIcon icon={faArrowLeft} />{' '}
                <FormattedMessage id="go_back" defaultMessage="Go back" />
              </Button>
            </Link>

            <h4>
              <FormattedMessage id="create" defaultMessage="Create" />{' '}
              <FormattedMessage id="post" defaultMessage="Post" />
            </h4>
            <div>
              <PostForm
                post={postEmpty}
                onSubmit={this.onSubmit}
                intl={this.props.intl}
              />
            </div>
          </Container>
        </Card>
      </div>
    );
  }
}

export default graphql(CREATE_POST)(injectIntl(withRouter(CreateOrEdit)));
