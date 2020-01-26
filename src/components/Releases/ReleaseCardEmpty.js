import React, { memo } from 'react';

import { ReleaseSkeletonLoading } from './styles';

export default memo(function ReleaseLoading() {
  const categories = [1, 2, 3];
  const rows = [1, 2, 3, 4];
  return (
    <>
      {categories.map(cat => (
        <ReleaseSkeletonLoading
          key={'cat-' + cat}
          className="my-3 p-3 rounded shadow-sm"
        >
          <h6 className="pb-2 mb-0 show-loading-animation"> </h6>
          {rows.map(r => (
            <div key={'row-' + r} className="media text-muted pt-3">
              <span className="mr-2 rounded">{''}</span>
              <p className="media-body pb-3 mb-0 small lh-125">
                <strong className="d-block text-gray-dark show-loading-animation" />
              </p>
            </div>
          ))}
        </ReleaseSkeletonLoading>
      ))}
    </>
  );
});
