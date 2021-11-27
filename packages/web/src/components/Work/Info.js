import React, { memo } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import useIntl from '@hooks/use-intl';

export const InfoStyle = styled(animated.div)`
  width: 100%;
  text-align: left;
  padding: 15px 20px;
`;

export const People = styled.div`
  display: inline-block;
  margin-right: 30px;
  margin-top: 10px;
`;

export const StatusBadge = styled.span`
  font-size: 25% !important;
  vertical-align: middle !important;
  margin-left: 15px !important;
`;

const GenresWrapper = styled.div`
  margin-top: 15px;
`;

export const GenreBadge = styled.span`
  margin: 0 0.5rem 1rem 0;
  padding: 0.3rem 0.5rem;
  border-radius: 2px;
`;

function Info({ work }) {
  const { f } = useIntl();
  const props = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    from: { opacity: 0.5, transform: 'translate3d(0,20px,0)' }
  });
  return (
    <InfoStyle style={props} className="col-md-8 col-md-offset-1">
      <div className="Description">{work.description}</div>
      <GenresWrapper>
        {work.genres.map(genre => (
          <GenreBadge
            key={genre.name}
            className="badge badge-pill badge-secondary"
          >
            {f({
              id: genre.name,
              defaultMessage: genre.name
            })}
          </GenreBadge>
        ))}
      </GenresWrapper>
      <div className="People">
        {work.staff.map(staff => (
          <People key={staff.rol_name + staff.people.name}>
            <h4>
              {f({
                id: 'people.rol.' + staff.rol_name,
                defaultMessage: staff.rol_name
              })}
            </h4>
            <span>{staff.people.name}</span>
          </People>
        ))}
      </div>
    </InfoStyle>
  );
}

export default memo(Info);
