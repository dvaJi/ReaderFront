import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { background, toRgb } from '../theme';

import { filterOptions } from './fuzzy-match-utils';
import getString from '../MultiSelect/get-string';
import SelectItem from './select-item';
import SelectList from './select-list';
import { DefaultItemRendererProps } from './default-item';

export type Option = {
  label: string;
  value: string;
  key?: string;
  disabled?: boolean;
};

export const FocusType = {
  SEARCH: -1,
  NONE: 0
};

const inputBackgroundColor = theme('mode', {
  light: background.light.lightest,
  dark: background.dark.light
});

const inputBorderColor = theme('mode', {
  light: toRgb(background.light.darker),
  dark: toRgb(background.dark.lighter)
});

const SelectSearchContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(${inputBorderColor}, 0.4);
  input {
    background-color: ${inputBackgroundColor};
    height: 38px;
    padding: 0 10px;
    width: 100%;
    outline: none;
    border: 0;
  }
`;

export type SelectPanelProps = {
  onChange: (value: Option[]) => void;
  options: Option[];
  value: Option[];
  filterOptions?: (
    options: Option[],
    filter: string,
    substitutions?: any
  ) => Option[];
  selectAllLabel?: string;
  ItemRenderer?: (props: DefaultItemRendererProps) => JSX.Element;
  disabled?: boolean;
  disableSearch?: boolean;
  focusSearchOnOpen?: boolean;
  hasSelectAll?: boolean;
  overrideStrings?: { [prop: string]: string };
};

export const SelectPanel = (props: SelectPanelProps) => {
  const {
    onChange,
    options,
    value,
    filterOptions: customFilterOptions,
    selectAllLabel,
    ItemRenderer,
    disabled,
    disableSearch,
    focusSearchOnOpen,
    hasSelectAll,
    overrideStrings
  } = props;
  const [searchText, setSearchText] = useState('');
  const [focusIndex, setFocusIndex] = useState(
    focusSearchOnOpen ? FocusType.SEARCH : FocusType.NONE
  );

  const [selectAllLength, setSelectAllLength] = useState(0);
  const selectAllOption: Option = {
    label: selectAllLabel || getString('selectAll', overrideStrings),
    value: ''
  };

  useEffect(() => {
    setSelectAllLength(selectAllValues(true).length);
    // eslint-disable-next-line
  }, [options]);

  const selectAllValues = (checked: boolean) => {
    const selectedValues = value.map(o => o.value);
    return options.filter(({ disabled, value }) => {
      if (checked) {
        return !disabled || selectedValues.includes(value);
      }
      return disabled && selectedValues.includes(value);
    });
  };

  const selectAllChanged = (checked: boolean) => {
    const newOptions = selectAllValues(checked);
    onChange(newOptions);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setFocusIndex(FocusType.SEARCH);
  };

  const handleItemClicked = (index: number) => setFocusIndex(index);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.which) {
      case 38: // Up Arrow
        if (e.altKey) {
          return;
        }
        updateFocus(-1);
        break;
      case 40: // Down Arrow
        if (e.altKey) {
          return;
        }
        updateFocus(1);
        break;
      default:
        return;
    }
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSearchFocus = () => {
    setFocusIndex(FocusType.SEARCH);
  };

  const filteredOptions = () =>
    customFilterOptions
      ? customFilterOptions(options, searchText)
      : filterOptions(options, searchText);

  const updateFocus = (offset: number) => {
    let newFocus = focusIndex + offset;
    newFocus = Math.max(0, newFocus);
    newFocus = Math.min(newFocus, options.length);
    setFocusIndex(newFocus);
  };

  return (
    <div className="select-panel" role="listbox" onKeyDown={handleKeyDown}>
      {!disableSearch && (
        <SelectSearchContainer>
          <input
            autoFocus={focusSearchOnOpen}
            placeholder={getString('search', overrideStrings)}
            type="search"
            aria-describedby={getString('search', overrideStrings)}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          />
        </SelectSearchContainer>
      )}

      {hasSelectAll && (
        <SelectItem
          focused={focusIndex === 0}
          checked={selectAllLength === value.length}
          option={selectAllOption}
          onSelectionChanged={selectAllChanged}
          onClick={() => handleItemClicked(0)}
          itemRenderer={ItemRenderer}
          disabled={disabled}
        />
      )}

      <SelectList
        {...props}
        options={filteredOptions()}
        focusIndex={focusIndex - 1}
        onClick={(_e, index) => handleItemClicked(index + 1)}
        ItemRenderer={ItemRenderer}
        disabled={disabled}
      />
    </div>
  );
};

export default SelectPanel;
