import React, { memo } from 'react';

import ReleaseItem from './ReleaseItem';

function ReleasesList({ releases }) {
  return (
    <div className="row mb-4">
      {releases.map(release => (
        <ReleaseItem release={release} key={release.id} />
      ))}
    </div>
  );
}

export default memo(ReleasesList);
