import React, { memo } from 'react';
import WorkItemEmpty from './WorkItemEmpty';

function WorksListLoading() {
  const rows = [];
  for (let index = 0; index < 8; index++) {
    rows.push(<WorkItemEmpty key={index} work={{}} size={'normal'} />);
  }
  return <div className="row mb-4">{rows}</div>;
}

export default memo(WorksListLoading);
