import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import Card from '@components/Works/WorkItem';
import CardLoading from '@components/Works/WorkItemEmpty';

const WorksList = styled.div`
  margin-top: 30px;
`;

function LatestWork({ works, isLoading }) {
  const { formatMessage: f } = useIntl();

  return (
    <div className="LatestWorks mb-4">
      <h3>{f({ id: 'recently_added', defaultMessage: 'Recently added' })}</h3>
      <WorksList className="row">
        {!isLoading
          ? works.map(work => (
              <Card key={work.uniqid} work={work} size={'small'} />
            ))
          : Array.from(new Array(4)).map((fk, index) => (
              <CardLoading
                key={'lw-card-loading-' + index}
                work={{ name: index.toString() }}
                size={'small'}
              />
            ))}
      </WorksList>
    </div>
  );
}

export default LatestWork;
