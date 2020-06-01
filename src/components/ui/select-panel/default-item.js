import React from 'react';
import styled from 'styled-components';

const DefaultRenderer = styled.div`
  input,
  span {
    vertical-align: middle;
    margin: 0;
  }
  span {
    display: inline-block;
    padding-left: 5px;
  }
  &.disabled {
    opacity: 0.5;
  }
`;

const DefaultItemRenderer = ({ checked, option, onClick, disabled }) => {
  return (
    <DefaultRenderer className={`item-renderer ${disabled && 'disabled'}`}>
      <input
        type="checkbox"
        onChange={onClick}
        checked={checked}
        tabIndex={-1}
        disabled={disabled}
      />
      <span>{option.label}</span>
    </DefaultRenderer>
  );
};

export default DefaultItemRenderer;
