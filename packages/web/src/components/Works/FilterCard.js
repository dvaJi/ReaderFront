import React from 'react';
import { useIntl } from 'react-intl';
import { forceCheck } from 'react-lazyload';

import { Input, Select } from '@readerfront/ui';
import { FilterCardWrapper } from './styles';

function FilterCard({
  filterText,
  onFilterTextChange,
  onChangeStatus,
  selectedStatus,
  statusList = []
}) {
  const { formatMessage: f } = useIntl();

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
        onChange={e => {
          onFilterTextChange(e.target.value);
          forceCheck();
        }}
      />
      <Select
        value={selectedStatus}
        onChange={e => onChangeStatus(e.target.value)}
      >
        <option value="">All</option>
        {statusList.map(st => (
          <option key={st} value={st}>
            {f({ id: st, defaultMessage: st })}
          </option>
        ))}
      </Select>
    </FilterCardWrapper>
  );
}

export default FilterCard;
