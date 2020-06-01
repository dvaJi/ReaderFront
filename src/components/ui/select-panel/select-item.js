import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { background } from 'lib/theme';

import DefaultItemRenderer from './default-item';

const selectedBackground = theme('mode', {
  light: background.light.light,
  dark: background.dark.dark
});

const hoverBackground = theme('mode', {
  light: background.light.lighter,
  dark: background.dark.darker
});

const ItemContainer = styled.label`
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  padding: 10px;
  outline: 0;
  &:hover,
  &:focus {
    background: ${hoverBackground};
  }
  &.selected {
    background: ${selectedBackground};
  }
`;

const SelectItem = ({
  itemRenderer: ItemRenderer = DefaultItemRenderer,
  option,
  checked,
  focused,
  disabled,
  onSelectionChanged,
  onClick
}) => {
  const itemRef = useRef();

  useEffect(() => {
    updateFocus();
    // eslint-disable-next-line
  }, [focused]);

  const toggleChecked = () => {
    onSelectionChanged(!checked);
  };

  const handleClick = e => {
    toggleChecked();
    onClick(e);
  };

  const updateFocus = () => {
    if (focused && !disabled && itemRef) {
      itemRef.current.focus();
    }
  };

  const handleKeyDown = e => {
    switch (e.which) {
      case 13: // Enter
      case 32: // Space
        toggleChecked();
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <ItemContainer
      className={`select-item ${checked && 'selected'}`}
      role="option"
      aria-selected={checked}
      tabIndex={-1}
      ref={itemRef}
      onKeyDown={handleKeyDown}
    >
      <ItemRenderer
        option={option}
        checked={checked}
        onClick={handleClick}
        disabled={disabled}
      />
    </ItemContainer>
  );
};

export default SelectItem;
