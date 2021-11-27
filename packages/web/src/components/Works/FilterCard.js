import React from 'react';
import useIntl from '@hooks/use-intl';

import { Input } from '@readerfront/ui';
import { FilterCardWrapper } from './styles';

function FilterCard({ filterText, onFilterTextChange }) {
  const { f } = useIntl();

  return (
    <FilterCardWrapper>
      <Input
        type="text"
        name="work-search"
        placeholder={f({
          id: 'search_work',
          defaultMessage: 'Search...'
        })}
        id="work-search"
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}
      />
    </FilterCardWrapper>
  );
}

export default FilterCard;
