import ReleaseItem from './ReleaseItem';
import React, { memo } from 'react';

export default memo(function ReleaseLoading() {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="row mb-4">
      {rows.map(r => (
        <ReleaseItem release={{ read_path: '', work: {} }} key={r} />
      ))}
    </div>
  );
});
