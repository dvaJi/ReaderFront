import React, { memo } from 'react';
import { Button } from 'reactstrap';

export default memo(function ReleasePagination({ page, onPageChange }) {
  return (
    <>
      <Button
        type="button"
        className="float-left"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <Button
        type="button"
        className="float-right"
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </>
  );
});
