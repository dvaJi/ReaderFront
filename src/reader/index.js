import React from 'react';

import ReaderContainer from './containers/ReaderContainer';

function Reader({ match, history }) {
  return <ReaderContainer match={match} history={history} />;
}

export default Reader;
