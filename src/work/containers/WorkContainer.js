import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

// App Imports
import MetaTag from './WorkMetaTag';
import Cover from '../components/Cover';
import Info from '../components/Info';
import ChapterList from '../components/ChapterList';
import WorkEmpty from '../components/WorkEmpty';
import { FETCH_WORK } from './query';
import { languageNameToId } from 'utils/common';

function WorkContainer() {
  const { stub } = useParams();
  const { locale } = useIntl();
  const language = {
    id: languageNameToId(locale),
    name: locale
  };
  const { loading, error, data } = useQuery(FETCH_WORK, {
    variables: { language: language.id, stub }
  });

  if (loading) return <WorkEmpty />;
  if (error) return <p id="error_releases">Error :(</p>;

  return (
    <>
      <MetaTag work={data.work} language={language} />
      <div className="row">
        <div className="col-md-4">
          <Cover work={data.work} name={data.work.name} />
        </div>
        <Info
          work={data.work}
          description={data.work.works_descriptions.find(
            e => e.language === language.id
          )}
        />
        <ChapterList work={data.work} language={language} />
      </div>
    </>
  );
}

export default WorkContainer;
