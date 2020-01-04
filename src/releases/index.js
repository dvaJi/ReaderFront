import React from 'react';
import { Container } from 'reactstrap';
import ReleasesContainer from './containers/ReleasesContainer';

function Releases() {
  return (
    <div id="releases">
      <Container>
        <ReleasesContainer />
      </Container>
    </div>
  );
}

export default Releases;
