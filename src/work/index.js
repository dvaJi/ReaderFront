import React from 'react';
import { Container } from 'reactstrap';

import WorkContainer from './containers/WorkContainer';
import ErrorBoundary from '../utils/ErrorBoundary';

function Work() {
  return (
    <div id="Work">
      <ErrorBoundary>
        <Container>
          <WorkContainer />
        </Container>
      </ErrorBoundary>
    </div>
  );
}

export default Work;
