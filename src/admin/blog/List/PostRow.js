import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Button, ButtonLink, ButtonGroup } from 'common/ui';

export default memo(function Row({
  post,
  statusTxt,
  categoryTxt,
  languageTxt,
  onRemove
}) {
  const { id, title, stub, createdAt, updatedAt } = post;
  return (
    <tr key={id}>
      <td>
        <Link to={'/admincp/blog/edit_post/' + stub}>{title}</Link>
      </td>

      <td>
        {categoryTxt !== undefined && (
          <FormattedMessage
            id={categoryTxt.name}
            defaultMessage={categoryTxt.name}
          />
        )}
      </td>

      <td>
        {statusTxt !== undefined && (
          <FormattedMessage
            id={statusTxt.name}
            defaultMessage={statusTxt.name}
          />
        )}
      </td>

      <td style={{ textAlign: 'center' }}>
        <FormattedMessage
          id={languageTxt.name + '_full'}
          defaultMessage={languageTxt.name}
        />
      </td>

      <td>{new Date(createdAt).toDateString()}</td>

      <td>{new Date(updatedAt).toDateString()}</td>

      <td style={{ textAlign: 'center' }}>
        <ButtonGroup>
          <ButtonLink size="sm" to={'/admincp/blog/edit_post/' + stub}>
            <FormattedMessage id="edit" defaultMessage="Edit" />
          </ButtonLink>
          <Button size="sm" onClick={() => onRemove(id)}>
            <FormattedMessage id="remove" defaultMessage="Remove" />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
});
