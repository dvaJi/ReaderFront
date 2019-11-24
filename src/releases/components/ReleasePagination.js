import React, { memo } from 'react';
import { Button } from 'reactstrap';
import { useIntl } from 'react-intl';

import { Paginator } from './styles';

export default memo(function ReleasePagination({ page, onPageChange }) {
  const { formatMessage: f } = useIntl();
  return (
    <Paginator>
      <Button
        id="prev_page"
        type="button"
        className="float-left"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        {f({ id: 'previous', defaultMessage: 'Previous' })}
      </Button>
      <Button
        id="next_page"
        type="button"
        className="float-right"
        onClick={() => onPageChange(page + 1)}
      >
        {f({ id: 'next', defaultMessage: 'Next' })}
      </Button>
    </Paginator>
  );
});
