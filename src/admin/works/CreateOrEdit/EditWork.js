import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Query, graphql } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// App imports
import PostForm from './Form';
import { Card } from '../../common/UI';
import { MetaTagEdit } from '../ACPWorksMetaTags';
import { FETCH_WORK, FETCH_WORKS } from '../query';
import { UPDATE_WORK } from '../mutation';

class EditPost extends Component {
  onSubmit = async (event, work) => {
    event.preventDefault();

    await this.props.mutate({
      variables: { ...work },
      refetchQueries: [
        {
          query: FETCH_WORKS
        }
      ]
    });

    this.props.history.push('/admincp/work/manage');
  };

  render() {
    const { match } = this.props;
    return (
      <div className="container">
        <MetaTagEdit />
        <div className="m-1">
          <Link to={'/admincp/work/manage'}>
            <Button>
              <FontAwesomeIcon icon={faArrowLeft} />{' '}
              <FormattedMessage id="go_back" defaultMessage="Go back" />
            </Button>
          </Link>
        </div>
        <Card>
          <Container>
            <h4>
              <FormattedMessage id="edit" defaultMessage="Edit" />{' '}
              <FormattedMessage id="work" defaultMessage="Work" />
            </h4>
            <Query
              query={FETCH_WORK}
              variables={{ stub: match.params.stub, language: -1 }}
            >
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
                    <MetaTagEdit workName={data.work.name} />
                    <PostForm
                      work={data.work}
                      onSubmit={this.onSubmit}
                      intl={this.props.intl}
                    />
                  </div>
                );
              }}
            </Query>
          </Container>
        </Card>
      </div>
    );
  }
}

export default graphql(UPDATE_WORK)(injectIntl(withRouter(EditPost)));
