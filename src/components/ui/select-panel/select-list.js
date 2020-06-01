import React from 'react';
import styled from 'styled-components';

import SelectItem from './select-item';

const SelectListUl = styled.ul`
  margin: 0;
  padding-left: 0;
  li {
    list-tyle: none;
    margin: 0;
  }
`;

const SelectList = ({
  value,
  onChange,
  disabled,
  ItemRenderer,
  options,
  focusIndex,
  onClick
}) => {
  const handleSelectionChanged = (option, checked) => {
    if (disabled) {
      return;
    }
    onChange(
      checked ? [...value, option] : value.filter(o => o.value !== option.value)
    );
  };

  return (
    <SelectListUl>
      {options.map((o, i) => (
        <li key={o.hasOwnProperty('key') ? o.key : i}>
          <SelectItem
            focused={focusIndex === i}
            option={o}
            onSelectionChanged={c => handleSelectionChanged(o, c)}
            checked={value.find(s => s.value === o.value) ? true : false}
            onClick={e => onClick(e, i)}
            itemRenderer={ItemRenderer}
            disabled={o.disabled || disabled}
          />
        </li>
      ))}
    </SelectListUl>
  );
};

export default SelectList;
