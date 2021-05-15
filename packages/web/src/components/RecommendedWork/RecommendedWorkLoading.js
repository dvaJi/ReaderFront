import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const LoadingCover = styled.div`
  background-color: white;
  min-height: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

function RecommendedWorkLoading() {
  return (
    <div className="Recommended mb-4">
      <h3>
        <FormattedMessage id="random" defaultMessage="Random" />
      </h3>
      <LoadingCover className="show-loading-animation" />
    </div>
  );
}

export default memo(RecommendedWorkLoading);
