import React, { memo } from 'react';
import WorkItemEmpty from './WorkItemEmpty';

function WorksListLoading() {
  const rows = [];
  for (let index = 0; index < 6; index++) {
    rows.push(<WorkItemEmpty key={index} work={{}} size={'normal'} />);
  }
  return rows;
}

export default memo(WorksListLoading);
