import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import Card from '@components/Works/WorkItem';
import CardLoading from '@components/Works/WorkItemEmpty';
import { subString } from 'utils/helpers';
import { getStatusTagStyle, workStatusIdToName } from 'utils/common';

const WorksList = styled.div`
  margin-top: 30px;
`;

function LatestWork({ works, isLoading }) {
  const { formatMessage: f } = useIntl();
  const handleTruncate = work => {
    if (work.works_descriptions.length === 0) {
      return '';
    }

    return subString(work.works_descriptions[0].description, 120);
  };

  return (
    <div className="LatestWorks mb-4">
      <h3>{f({ id: 'recently_added', defaultMessage: 'Recently added' })}</h3>
      <WorksList>
        {!isLoading
          ? works.map(work => (
              <Card
                key={work.id}
                truncate={handleTruncate}
                redirectTo={work => `/work/${work.stub}`}
                statusTag={statusId => ({
                  style: getStatusTagStyle(statusId),
                  name: workStatusIdToName(statusId)
                })}
                work={work}
                size={'small'}
              />
            ))
          : Array.from(new Array(4)).map((fk, index) => (
              <CardLoading
                key={'lw-card-loading-' + index}
                work={{}}
                size={'small'}
              />
            ))}
      </WorksList>
    </div>
  );
}

export default LatestWork;
