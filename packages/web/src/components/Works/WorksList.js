import React, { memo, useMemo } from 'react';
import WorkItem from './WorkItem';

import useIntl from '@hooks/use-intl';

function WorkList({ works, filterText }) {
  const { f } = useIntl();
  const filtered = useMemo(() => {
    const list = {
      on_going: [],
      completed: [],
      dropped: []
    };

    works
      .filter(work =>
        work.name.toUpperCase().startsWith(filterText.toUpperCase())
      )
      .forEach(work => {
        list[work.status_name].push(work);
      });

    return list;
  }, [works, filterText]);

  return (
    <div id="works-list">
      <h2>
        {f({ id: 'on_going', value: 'On going' })}
      </h2>
      <div className="row mb-4">
        {filtered.on_going.map(work => (
          <WorkItem
            key={work.uniqid + work.language_name}
            work={work}
            size={'normal'}
          />
        ))}
      </div>
      <h2>
        {f({ id: 'completed', value: 'Completed' })}
      </h2>
      <div className="row mb-4">
        {filtered.completed.map(work => (
          <WorkItem
            key={work.uniqid + work.language_name}
            work={work}
            size={'normal'}
          />
        ))}
      </div>
      <h2>
        {f({ id: 'dropped', value: 'Dropped' })}
      </h2>
      <div className="row mb-4">
        {filtered.dropped.map(work => (
          <WorkItem
            key={work.uniqid + work.language_name}
            work={work}
            size={'normal'}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(WorkList);
