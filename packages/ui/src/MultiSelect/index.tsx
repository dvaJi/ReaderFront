import React from 'react';

import SelectPanel, { Option } from '../select-panel';
import Dropdown from './dropdown';
import DropdownHeader from './header';

import styled from 'styled-components';
import { DefaultItemRendererProps } from '../select-panel/default-item';

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

type DropdownProps = {
  focusSearchOnOpen?: boolean;
  hasSelectAll?: boolean;
  shouldToggleOnHover?: boolean;
  className?: string;
  options: Option[];
  value: Option[];
  valueRenderer?: (value: Option[], options: Option[]) => string;
  overrideStrings?: { [props: string]: string };
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  ItemRenderer?: (props: DefaultItemRendererProps) => JSX.Element;
  ArrowRenderer?: (props: { expanded?: boolean }) => JSX.Element;
  selectAllLabel?: string;
  isLoading?: boolean;
  disableSearch?: boolean;
  filterOptions?: (
    options: Option[],
    filter: string,
    substitutions?: any
  ) => Option[];
  labelledBy?: string;
  onMenuToggle?: (expanded: boolean) => void;
};

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
}: DropdownProps) => {
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
