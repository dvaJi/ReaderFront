import React, { memo } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useSpring, animated } from 'react-spring';

import {
  genreTypeIdToName,
  rolIdToName,
  workStatusIdToName,
  getStatusTagStyle,
  genreDemographicIdToName
} from '../../utils/common';

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
  const props = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    from: { opacity: 0.5, transform: 'translate3d(0,20px,0)' }
  });
  return (
    <InfoStyle style={props} className="col-md-8 col-md-offset-1">
      <InfoTitle className="display-4">
        {work.type.toUpperCase()} -{' '}
        {genreDemographicIdToName(work.demographicId).toUpperCase()}
      </InfoTitle>
      <h4 className="display-4">
        {work.name}
        <StatusBadge
          className="badge badge-secondary"
          style={{
            ...getStatusTagStyle(work.status)
          }}
        >
          <FormattedMessage
            id={workStatusIdToName(work.status)}
            defaultMessage={workStatusIdToName(work.status)}
          />
        </StatusBadge>
      </h4>
      <div className="Description">
        {description !== undefined ? description.description : ''}
      </div>
      <div className="Genres">
        {work.works_genres.length > 0 && (
          <h4>
            <FormattedMessage id="genres" defaultMessage="Genres" />
          </h4>
        )}
        {work.works_genres.map(g => {
          const genre = genreTypeIdToName(g.genreId);
          return (
            <GenreBadge
              key={genre}
              className="badge badge-pill badge-secondary"
            >
              <FormattedMessage id={genre} defaultMessage={genre} />
            </GenreBadge>
          );
        })}
      </div>
      <div className="People">
        {work.people_works.map(peopleWork => {
          const rol = rolIdToName(peopleWork.rol);
          return (
            <People key={peopleWork.rol + peopleWork.people.id}>
              <h4>
                <FormattedMessage
                  id={'people.rol.' + rol}
                  defaultMessage={rol}
                />
              </h4>
              <span>{peopleWork.people.name}</span>
            </People>
          );
        })}
      </div>
    </InfoStyle>
  );
}

export default memo(Info);
