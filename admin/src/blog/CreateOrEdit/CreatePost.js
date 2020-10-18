import React from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  category: 1,
  uniqid: '',
  type: 0,
  title: '',
  stub: '',
  status: 1,
  sticky: false,
  language: 1,
  thumbnail: ''
};

function CreateOrEdit() {
  const history = useHistory();
  const { formatMessage: f } = useIntl();
  const [createPost] = useMutation(CREATE_POST);

  return (
    <Container>
      <MetaTagCreate />
      <div style={{ marginTop: '1rem' }}>
        <ButtonLink to={'/blog/manage'}>
          <FontAwesomeIcon icon="arrow-left" />{' '}
          {f({ id: 'go_back', defaultMessage: 'Go back' })}
        </ButtonLink>
      </div>
      <Card>
        <h4>
          {f({ id: 'create', defaultMessage: 'Create' })}{' '}
          {f({ id: 'post', defaultMessage: 'Post' })}
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

              history.push('/blog/manage');
            }}
          />
        </div>
      </Card>
    </Container>
  );
}

export default CreateOrEdit;
