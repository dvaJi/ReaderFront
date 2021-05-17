import React from 'react';
import Lazyload from 'react-lazyload';
import { Container } from 'reactstrap';

import DisqusThread from '../DisqusComments';

function Comments({ id, title, path }) {
  return (
    <Container className="Comment">
      <Lazyload throttle={200} height={300}>
        <DisqusThread id={id} title={title} path={path} />
      </Lazyload>
    </Container>
  );
}

export default Comments;
