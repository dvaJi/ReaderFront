import React, { memo, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import WorkItem from './WorkItem';

function WorkList({ works, filterText }) {
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
        <FormattedMessage id="on_going" defaultMessage="On Going" />
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
        <FormattedMessage id="completed" defaultMessage="Completed" />
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
        <FormattedMessage id="dropped" defaultMessage="Dropped" />
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
