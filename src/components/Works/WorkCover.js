import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSpring } from 'react-spring';

import { CardMedia, Overlay, Cover, Tag } from './styles';

function WorkCover({ name, cover, size, status }) {
  const tagProps = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    from: {
      opacity: 0.2,
      transform: 'translate3d(10px,0,0)'
    }
  });
  const coverProps = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    from: { opacity: 0.8, transform: 'translate3d(0,2px,0)' }
  });
  return (
    <CardMedia size={size}>
      <Cover
        size={size}
        style={{ backgroundImage: `url(${cover})`, ...coverProps }}
      >
        {size === 'small' && (
          <Overlay>
            <span className="title">{name}</span>
          </Overlay>
        )}
      </Cover>
      {size !== 'small' && status && (
        <Tag
          style={{
            ...tagProps,
            backgroundColor: status ? status.background : '',
            color: status ? status.color : ''
          }}
        >
          <FormattedMessage id={status.name} defaultMessage={status.name} />
        </Tag>
      )}
    </CardMedia>
  );
}
export default WorkCover;
