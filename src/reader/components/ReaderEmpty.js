import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Text = styled.div`
  background-color: #ddd;
`;

const Page = styled.div`
  background-color: #ddd;
  text-align: center;
  margin: 20px auto;
  width: 90%;
  height: 100%;
  min-height: 600px;
`;

export default class ReaderEmpty extends PureComponent {
  render() {
    return (
      <div className="ReaderBar shimme-reader">
        <div className="text-left">
          <Text className="show-loading-animation">{'\u00A0'}</Text>
          <div className="pull-right" />
        </div>
        <Page className="show-loading-animation">{'\u00A0'}</Page>
      </div>
    );
  }
}
