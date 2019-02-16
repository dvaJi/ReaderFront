import React, { memo } from 'react';
import WorkItem from './WorkItem';
import { useSpring, animated } from 'react-spring';

import {
  workStatusIdToName,
  getStatusTagStyle,
  getWorkThumb
} from '../../utils/common';
import { subString } from '../../utils/helpers';

const truncate = work => {
  if (work.works_descriptions.length === 0) {
    return '';
  }

  return subString(work.works_descriptions[0].description, 120);
};

const statusTag = statusId => {
  return {
    style: getStatusTagStyle(statusId),
    name: workStatusIdToName(statusId)
  };
};

const thumbUrl = work => {
  const dir = work.stub + '_' + work.uniqid;
  return getWorkThumb(dir, work.thumbnail, 'small');
};

function WorkList({ works, filterText }) {
  const springProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 }
  });

  return works
    .filter(work =>
      work.name.toUpperCase().startsWith(filterText.toUpperCase())
    )
    .map(work => (
      <animated.span key={work.id} style={springProps}>
        <WorkItem
          key={work.id}
          truncate={truncate}
          thumbUrl={thumbUrl}
          statusTag={statusTag}
          work={work}
          size={'normal'}
        />
      </animated.span>
    ));
}

export default memo(WorkList);
