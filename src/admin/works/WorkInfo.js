import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import { MetaTagDetail } from './ACPWorksMetaTags';
import { FETCH_WORK } from './query';
import {
  languageIdToName,
  genreTypeIdToName,
  rolIdToName,
  workStatusIdToName,
  genreDemographicIdToName
} from 'utils/common';
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
  return (
    <Card>
      <Query
        query={FETCH_WORK}
        variables={{
          language: -1,
          stub: stub
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <WorkLoading />;
          if (error) return <p id="error_releases">Error :(</p>;
          return (
            <>
              <MetaTagDetail work={data.work} />

              <h5 className="border-bottom border-gray pb-2 mb-0">
                {data.work.hidden && (
                  <span className="badge badge-danger mr-1">
                    <FormattedMessage id={'hidden'} defaultMessage={'Hidden'} />
                  </span>
                )}
                {data.work.name}
                <span className="badge badge-secondary ml-1">
                  <FormattedMessage
                    id={workStatusIdToName(data.work.status)}
                    defaultMessage={workStatusIdToName(data.work.status)}
                  />
                </span>
                <span className="badge badge-secondary ml-1">
                  {data.work.type}
                </span>
                <span className="badge badge-secondary ml-1">
                  {genreDemographicIdToName(data.work.demographicId)}
                </span>
              </h5>
              <div className="media text-muted pt-3">
                {data.work.people_works.map(peopleWork => {
                  const rol = rolIdToName(peopleWork.rol);
                  return (
                    <p
                      className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
                      key={peopleWork.rol + peopleWork.people.id}
                    >
                      <strong className="d-block text-gray-dark">
                        <FormattedMessage
                          id={'people.rol.' + rol}
                          defaultMessage={rol}
                        />
                      </strong>
                      {peopleWork.people.name}
                    </p>
                  );
                })}
              </div>
              <div className="media text-muted pt-3">
                {data.work.works_descriptions.map(desc => (
                  <p
                    className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
                    key={desc.language}
                  >
                    <strong className="d-block text-gray-dark">
                      <FormattedMessage
                        id={languageIdToName(desc.language) + '_full'}
                        defaultMessage={languageIdToName(desc.language)}
                      />
                    </strong>
                    {desc.description}
                  </p>
                ))}
              </div>
              <div>
                {data.work.works_genres.map(g => {
                  const genre = genreTypeIdToName(g.genreId);
                  return (
                    <span key={genre} className="badge badge-pill badge-light">
                      <FormattedMessage id={genre} defaultMessage={genre} />
                    </span>
                  );
                })}
              </div>
            </>
          );
        }}
      </Query>
    </Card>
  );
};

export default WorkInfo;
