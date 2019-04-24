import React, { memo } from 'react';
import { ButtonLink } from '../../common/ui/Button';

function Button({ id, url, text, chapter, gaEvent }) {
  const handleOnClick = () => gaEvent(`Press ${text}`, url);
  return (
    <ButtonLink
      id={id}
      color="primary"
      onClick={handleOnClick}
      to={url}
      disabled={chapter === -1}
    >
      {text}
    </ButtonLink>
  );
}

export default memo(Button);
