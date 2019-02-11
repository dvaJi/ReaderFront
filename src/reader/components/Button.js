import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button as RButton } from 'reactstrap';

function Button({ id, url, text, chapter, gaEvent }) {
  const handleOnClick = () => gaEvent(`Press ${text}`, url);
  return (
    <RButton
      id={id}
      tag={Link}
      color="primary"
      onClick={handleOnClick}
      to={url}
      disabled={chapter === -1}
    >
      {text}
    </RButton>
  );
}

export default memo(Button);
