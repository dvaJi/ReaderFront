import React from 'react';
import styled from 'styled-components';
import { Option } from '.';
import { DefaultItemRendererProps } from './default-item';

import SelectItem from './select-item';

const SelectListUl = styled.ul`
  margin: 0;
  padding-left: 0;
  li {
    list-tyle: none;
    margin: 0;
  }
`;

type Props = {
  value: Option[];
  onChange: (options: Option[]) => void;
  disabled?: boolean;
  ItemRenderer?: (props: DefaultItemRendererProps) => JSX.Element;
  options: Option[];
  focusIndex: number;
  onClick: (e: React.FormEvent<HTMLInputElement>, i: number) => void;
};

const SelectList = ({
  value,
  onChange,
  disabled,
  ItemRenderer,
  options,
  focusIndex,
  onClick
}: Props) => {
  const handleSelectionChanged = (option: Option, checked: boolean) => {
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
