import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { Option } from '.';
import { background } from '../theme';

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

type Props = {
  itemRenderer?: typeof DefaultItemRenderer;
  option: Option;
  checked: boolean;
  focused: boolean;
  disabled?: boolean;
  onSelectionChanged: (chk: boolean) => void;
  onClick: (e: React.FormEvent<HTMLInputElement>) => void;
};

const SelectItem = ({
  itemRenderer: ItemRenderer = DefaultItemRenderer,
  option,
  checked,
  focused,
  disabled,
  onSelectionChanged,
  onClick
}: Props) => {
  const itemRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    updateFocus();
    // eslint-disable-next-line
  }, [focused]);

  const toggleChecked = () => {
    onSelectionChanged(!checked);
  };

  const handleClick = (e: React.FormEvent<HTMLInputElement>) => {
    toggleChecked();
    onClick(e);
  };

  const updateFocus = () => {
    if (focused && !disabled && itemRef && itemRef.current) {
      itemRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
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
