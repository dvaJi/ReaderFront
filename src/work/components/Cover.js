import React, { PureComponent } from 'react';
import styled from 'styled-components';

const CoverStyle = styled.img`
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
`;

export default class Cover extends PureComponent {
  render() {
    const { cover, name } = this.props;
    return <CoverStyle src={cover} alt={name} />;
  }
}
