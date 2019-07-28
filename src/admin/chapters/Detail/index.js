import React from 'react';

import Detail from './Detail';
import ErrorBoundary from 'utils/ErrorBoundary';

function Index({match}) {
  return (<ErrorBoundary>
      <Detail match={match} />
  </ErrorBoundary>);
}

export default Index;
