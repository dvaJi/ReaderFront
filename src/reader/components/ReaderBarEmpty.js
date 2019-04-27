import React, { memo } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';

import { primaryColor, background } from '../../themes';

export const cardBackgroundColor = theme('mode', {
  light: background.light.dark,
  dark: background.dark.light
});

const Bar = styled.div`
  height: 38px;
  margin-bottom: 15px;
`;

const Text = styled.div`
  background-color: ${cardBackgroundColor};
  width: 64%;
  display: inline-block;
  margin-right: 8%;
  height: 38px;
`;

const Button = styled.div`
  background-color: ${primaryColor};
  width: 13%;
  display: inline-block;
  margin-left: 5px;
  height: 38px;
`;

function ReaderBarEmpty() {
  return (
    <Bar>
      <Text className="show-loading-animation">{'\u00A0'}</Text>
      <Button className="show-loading-animation">{'\u00A0'}</Button>
      <Button className="show-loading-animation">{'\u00A0'}</Button>
    </Bar>
  );
}

export default memo(ReaderBarEmpty);
