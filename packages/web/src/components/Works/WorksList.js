import React, { memo } from 'react';
import WorkItem from './WorkItem';

function WorkList({ works, filterText, selectedStatus }) {
  return (
    <div id="works-list">
      {works
        .filter(
          work =>
            work.name.toUpperCase().startsWith(filterText.toUpperCase()) &&
            (!selectedStatus || selectedStatus === work.status_name)
        )
        .map(work => (
          <WorkItem key={work.id} work={work} size={'normal'} />
        ))}
    </div>
  );
}

export default memo(WorkList);
