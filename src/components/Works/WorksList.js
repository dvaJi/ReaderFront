import React, { memo } from 'react';
import WorkItem from './WorkItem';

function WorkList({ works, filterText }) {
  return (
    <div id="works-list">
      {works
        .filter(work =>
          work.name.toUpperCase().startsWith(filterText.toUpperCase())
        )
        .map(work => (
          <WorkItem key={work.id} work={work} size={'normal'} />
        ))}
    </div>
  );
}

export default memo(WorkList);
