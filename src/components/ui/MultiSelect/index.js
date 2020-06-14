import React from 'react';

import SelectPanel from '../select-panel';
import Dropdown from './dropdown';
import DropdownHeader from './header';

import styled from 'styled-components';

const MultiSelectBox = styled.div`
  width: 100%;

  * {
    box-sizing: border-box;
    transition: all 0.2s ease;
  }

  .gray {
    color: #aaa;
  }
`;

export const MultiSelect = ({
  focusSearchOnOpen = true,
  hasSelectAll = true,
  shouldToggleOnHover = false,
  className = 'multi-select',
  options,
  value,
  valueRenderer,
  overrideStrings,
  onChange,
  disabled,
  ItemRenderer,
  ArrowRenderer,
  selectAllLabel,
  isLoading,
  disableSearch,
  filterOptions,
  labelledBy,
  onMenuToggle
}) => {
  const nvalue = value || [];
  return (
    <MultiSelectBox className={className}>
      <Dropdown
        isLoading={isLoading}
        contentComponent={SelectPanel}
        shouldToggleOnHover={shouldToggleOnHover}
        contentProps={{
          ItemRenderer,
          options,
          value: nvalue,
          hasSelectAll,
          selectAllLabel,
          onChange,
          disabled,
          disableSearch,
          focusSearchOnOpen,
          filterOptions,
          overrideStrings
        }}
        disabled={disabled}
        labelledBy={labelledBy}
        onMenuToggle={onMenuToggle}
        ArrowRenderer={ArrowRenderer}
      >
        <DropdownHeader
          value={nvalue}
          options={options}
          valueRenderer={valueRenderer}
          overrideStrings={overrideStrings}
        />
      </Dropdown>
    </MultiSelectBox>
  );
};
