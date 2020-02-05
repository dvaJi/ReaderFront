import React from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import { MetaTagDetail } from './ACPWorksMetaTags';
import { FETCH_WORK } from './query';
import { Card } from 'common/ui';

const InfoTitle = styled.p`
  background-color: #ddd;
  width: 50%;
  height: 20px;
`;

const InfoDescLanguage = styled.p`
  background-color: #ddd;
  width: 20%;
  height: 20px;
`;

const InfoDescription = styled.p`
  background-color: #ddd;
  ${props => (props.row === 1 ? 'width: 50%;' : '')}
  ${props => (props.row === 2 ? 'width: 40%;' : '')}
  ${props => (props.row === 3 ? 'width: 55%;' : '')}
  height: 15px;
  margin-top: 3px;
`;

const WorkLoading = () => (
  <>
    <h5 className="border-bottom border-gray pb-2 mb-0">
      {' '}
      <InfoTitle className="show-loading-animation">{'\u00A0'}</InfoTitle>
    </h5>
    <div className="media text-muted pt-3">
      <span className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong className="d-block text-gray-dark">
          <InfoDescLanguage className="show-loading-animation">
            {'\u00A0'}
          </InfoDescLanguage>
        </strong>
        <InfoDescription row={1} className="show-loading-animation">
          {'\u00A0'}
        </InfoDescription>
        <InfoDescription row={2} className="show-loading-animation">
          {'\u00A0'}
        </InfoDescription>
        <InfoDescription row={3} className="show-loading-animation">
          {'\u00A0'}
        </InfoDescription>
      </span>
    </div>
  </>
);

const WorkInfo = ({ stub }) => {
  const { formatMessage: f } = useIntl();
  const { loading, error, data } = useQuery(FETCH_WORK, {
    variables: { language: -1, stub: stub }
  });

  if (loading) return <WorkLoading />;
  if (error) return <p id="error_releases">Error :(</p>;
  console.log({ loading, error, data });
  return (
    <Card>
      <MetaTagDetail work={data.work} />

      <h5 className="border-bottom border-gray pb-2 mb-0">
        {data.work.hidden && (
          <span className="badge badge-danger mr-1">
            {f({ id: 'hidden', defaultMessage: 'Hidden' })}
          </span>
        )}
        {data.work.name}
        <span className="badge badge-secondary ml-1">
          {f({
            id: data.work.status_name,
            defaultMessage: data.work.status_name
          })}
        </span>
        <span className="badge badge-secondary ml-1">{data.work.type}</span>
        <span className="badge badge-secondary ml-1">
          {data.work.demographic_name}
        </span>
      </h5>
      <div className="media text-muted pt-3">
        {data.work.staff.map(staff => (
          <p
            className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
            key={staff.rol + staff.people.id}
          >
            <strong className="d-block text-gray-dark">
              {f({
                id: 'people.rol.' + staff.rol_name,
                defaultMessage: staff.rol_name
              })}
            </strong>
            {staff.people.name}
          </p>
        ))}
      </div>
      <div className="media text-muted pt-3">
        {data.work.languages.map(language => (
          <p
            className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
            key={language.name}
          >
            <strong className="d-block text-gray-dark">
              {f({
                id: `${language.name}_full`,
                defaultMessage: language.name
              })}
            </strong>
            {language.description_short}
          </p>
        ))}
      </div>
      <div>
        {data.work.genres.map(g => (
          <span key={g.name} className="badge badge-pill badge-light">
            {f({ id: g.name, defaultMessage: g.name })}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default WorkInfo;
