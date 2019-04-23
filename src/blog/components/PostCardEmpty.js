import React, { memo } from 'react';
import styled from 'styled-components';

import { cardBackgroundColor } from '../../themes';

const Card = styled.div`
  display: inline-block;
  position: relative;
  width: 310px;
  background-color: ${cardBackgroundColor};
  vertical-align: top;
  text-align: left;
  height: 480px;
  margin: 20px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  white-space: normal;
`;

export default memo(function PostCardEmpty() {
  const cards = [1, 2, 3, 4, 5, 6];
  return cards.map(c => (
    <Card key={'posts-loading-' + c} className="show-loading-animation" />
  ));
});
