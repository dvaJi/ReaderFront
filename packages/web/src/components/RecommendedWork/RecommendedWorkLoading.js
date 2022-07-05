import React, { memo } from 'react';
import styled from 'styled-components';

import useIntl from '@hooks/use-intl';

const LoadingCover = styled.div`
  background-color: white;
  min-height: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

function RecommendedWorkLoading() {
  const { f } = useIntl();
  return (
    <div className="Recommended mb-4">
      <h3>{f({ id: 'random', defaultMessage: 'Random' })}</h3>
      <LoadingCover className="show-loading-animation" />
    </div>
  );
}

export default memo(RecommendedWorkLoading);
