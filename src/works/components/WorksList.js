import React, { memo } from 'react';
import WorkItem from './WorkItem';

import { workStatusIdToName, getStatusTagStyle } from 'utils/common';
import { subString } from 'utils/helpers';

function WorkList({ works, filterText }) {
  return works
    .filter(work =>
      work.name.toUpperCase().startsWith(filterText.toUpperCase())
    )
    .map(work => (
      <WorkItem
        key={work.id}
        truncate={work => {
          if (work.works_descriptions.length === 0) {
            return '';
          }

          return subString(work.works_descriptions[0].description, 120);
        }}
        statusTag={statusId => ({
          style: getStatusTagStyle(statusId),
          name: workStatusIdToName(statusId)
        })}
        work={work}
        size={'normal'}
      />
    ));
}

export default memo(WorkList);
