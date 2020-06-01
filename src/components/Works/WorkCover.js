import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSpring } from 'react-spring';

import Flag from '@components/Flag';
import { CardMedia, Overlay, Cover, Tag, FlagWrapper } from './styles';

function WorkCover({ work, cover, size, status }) {
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
            <span className="title">
              {work.name}
              <FlagWrapper>
                <Flag language={work.language_name} />
              </FlagWrapper>
            </span>
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
