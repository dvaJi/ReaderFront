import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Button, ButtonLink, ButtonGroup } from 'common/ui';

export default memo(function PostRow({ post, onRemove }) {
  const { id, title, stub, category_name, status_name, language_name } = post;
  return (
    <tr key={id}>
      <td>
        <Link to={'/blog/edit_post/' + stub}>{title}</Link>
      </td>

      <td>
        <FormattedMessage id={category_name} defaultMessage={category_name} />
      </td>

      <td>
        <FormattedMessage id={status_name} defaultMessage={status_name} />
      </td>

      <td style={{ textAlign: 'center' }}>
        <FormattedMessage
          id={language_name + '_full'}
          defaultMessage={language_name}
        />
      </td>

      <td style={{ textAlign: 'center' }}>
        <ButtonGroup>
          <ButtonLink size="sm" to={'/blog/edit_post/' + stub}>
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
