import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Query, graphql } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// App imports
import PostForm from './Form';
import { Card, ButtonLink, Container } from 'common/ui';
import { MetaTagEdit } from '../ABlogMetatag';
import { FIND_BY_STUB, FETCH_ALL_POSTS_WITH_AGG } from '../queries';
import { UPDATE_POST } from '../mutations';

function EditPost({ updatePost }) {
  const history = useHistory();
  const { stub } = useParams();
  const { formatMessage: f } = useIntl();

  return (
    <Container>
      <MetaTagEdit />
      <div style={{ marginTop: '1rem' }}>
        <ButtonLink to={'/admincp/blog/manage'}>
          <FontAwesomeIcon icon={faArrowLeft} />{' '}
          {f({ id: 'go_back', defaultMessage: 'Go back' })}
        </ButtonLink>
      </div>
      <Card>
        <h4>
          {f({ id: 'edit', defaultMessage: 'Edit' })}{' '}
          {f({ id: 'post', defaultMessage: 'Post' })}
        </h4>
        <Query query={FIND_BY_STUB} variables={{ stub }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div>{f({ id: 'loading', defaultMessage: 'Loading...' })}</div>
              );
            if (error) return <p id="error_edit_post">Error :(</p>;
            return (
              <div>
                <MetaTagEdit postTitle={data.postByStub.title} />
                <PostForm
                  post={data.postByStub}
                  onSubmit={async (event, post) => {
                    event.preventDefault();

                    await updatePost({
                      variables: { ...post },
                      refetchQueries: [
                        {
                          query: FETCH_ALL_POSTS_WITH_AGG,
                          variables: { first: 20, offset: 0 }
                        }
                      ]
                    });

                    history.push('/admincp/blog/manage');
                  }}
                  intl={f}
                />
              </div>
            );
          }}
        </Query>
      </Card>
    </Container>
  );
}

export default graphql(UPDATE_POST, { name: 'updatePost' })(EditPost);
