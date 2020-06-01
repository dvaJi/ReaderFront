import React from 'react';

import getString from './get-string';

const DropdownHeader = ({ value, options, valueRenderer, overrideStrings }) => {
  const noneSelected = value.length === 0;
  const allSelected = value.length === options.length;
  const customText = valueRenderer && valueRenderer(value, options);

  const getSelectedText = () => value.map(s => s.label).join(', ');

  if (noneSelected) {
    return (
      <span className="gray">
        {customText || getString('selectSomeItems', overrideStrings)}
      </span>
    );
  }

  return (
    <span>
      {customText
        ? customText
        : allSelected
        ? getString('allItemsAreSelected', overrideStrings)
        : getSelectedText()}
    </span>
  );
};

export default DropdownHeader;
