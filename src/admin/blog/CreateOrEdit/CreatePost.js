import React from 'react';
import { graphql } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// App imports
import PostForm from './Form';
import { Card, ButtonLink, Container } from 'common/ui';
import { MetaTagCreate } from '../ABlogMetatag';
import { FETCH_ALL_POSTS_WITH_AGG } from '../queries';
import { CREATE_POST } from '../mutations';

export const postEmpty = {
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

function CreateOrEdit({ createPost }) {
  const history = useHistory();
  const { formatMessage: f } = useIntl();

  return (
    <Container>
      <MetaTagCreate />
      <div style={{ marginTop: '1rem' }}>
        <ButtonLink to={'/admincp/blog/manage'}>
          <FontAwesomeIcon icon={faArrowLeft} />{' '}
          {f({ id: 'go_back', defaultMessage: 'Go back' })}
        </ButtonLink>
      </div>
      <Card>
        <h4>
          {f({ id: 'create', defaultMessage: 'Create' })}{' '}
          {f({ id: 'post', defaultMessage: 'Go Post' })}
        </h4>
        <div>
          <PostForm
            post={postEmpty}
            onSubmit={async (event, post) => {
              event.preventDefault();

              await createPost({
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
      </Card>
    </Container>
  );
}

export default graphql(CREATE_POST, { name: 'createPost' })(CreateOrEdit);
