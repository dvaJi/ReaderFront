import React, { memo } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useSpring, animated } from 'react-spring';

import { statusById } from '@shared/params/works';

export const InfoStyle = styled(animated.div)`
  width: 100%;
  text-align: left;
  padding: 15px 20px;
`;

export const InfoTitle = styled.h4`
  font-size: 1em !important;
  line-height: 0 !important;
  font-weight: 400 !important;
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

export const GenreBadge = styled.span`
  margin-right: 3px;
`;

function Info({ work, description }) {
  const { formatMessage: f } = useIntl();
  const props = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    from: { opacity: 0.5, transform: 'translate3d(0,20px,0)' }
  });
  const status = statusById(work.status);
  return (
    <InfoStyle style={props} className="col-md-8 col-md-offset-1">
      <InfoTitle className="display-4">
        {`${work.type.toUpperCase()} - ${work.demographic_name.toUpperCase()}`}
      </InfoTitle>
      <h4 className="display-4">
        {work.name}
        <StatusBadge
          className="badge badge-secondary"
          style={{ background: status.background, color: status.color }}
        >
          {f({
            id: work.status_name,
            defaultMessage: work.status_name
          })}
        </StatusBadge>
      </h4>
      <div className="Description">
        {description !== undefined ? description.description : ''}
      </div>
      <div className="Genres">
        {work.genres.length > 0 && (
          <h4>
            {f({
              id: 'genres',
              defaultMessage: 'Genres'
            })}
          </h4>
        )}
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
      </div>
      <div className="People">
        {work.staff.map(staff => (
          <People key={staff.rol + staff.people.id}>
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
