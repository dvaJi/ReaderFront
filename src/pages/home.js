import React, { memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FormattedMessage } from 'react-intl';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import { useGlobalState } from 'lib/state';
import { logException } from 'lib/analytics';
import { DISCORD_ID, APP_TITLE } from 'lib/config';

import ComicSlide from '@components/ComicSlide';
import DiscordWidget from '@components/DiscordWidget';
import RecommendedWork from '@components/RecommendedWork';
import RecommendedWorkLoading from '@components/RecommendedWork/RecommendedWorkLoading';
import LatestWorks from '@components/LatestWorks';

export const FETCH_RELEASES = gql`
  query HomeChapters(
    $languages: [Int]
    $orderBy: String
    $first: Int
    $offset: Int
  ) {
    chapters(
      languages: $languages
      orderBy: $orderBy
      first: $first
      offset: $offset
      showHidden: false
    ) {
      id
      chapter
      subchapter
      volume
      language
      language_name
      name
      stub
      uniqid
      thumbnail_path
      read_path
      releaseDate
      work {
        id
        stub
        name
        uniqid
        adult
      }
    }
  }
`;

export const FETCH_LATEST_WORKS = gql`
  query LatestWorks($languages: [Int]) {
    works(
      languages: $languages
      orderBy: "DESC"
      sortBy: "id"
      first: 10
      offset: 0
      showHidden: false
    ) {
      id
      name
      stub
      uniqid
      type
      demographicId
      status
      adult
      thumbnail_path
      description_short
      language_name
    }
  }
`;

export const FETCH_RANDOM_WORK = gql`
  query RandomWork($languages: [Int]) {
    workRandom(languages: $languages) {
      id
      name
      stub
      uniqid
      type
      demographicId
      status
      adult
      thumbnail_path
      description_short
      language_name
    }
  }
`;

const LatestReleases = ({ languages }) => {
  const { loading, error, data } = useQuery(FETCH_RELEASES, {
    variables: { languages, orderBy: 'DESC', first: 20, offset: 0 }
  });

  if (loading) return <ComicSlide chapters={[]} isLoading={true} />;
  if (error) {
    logException(JSON.stringify(error), true);
    return <ComicSlide chapters={[]} isLoading={true} />;
  }

  return <ComicSlide chapters={data.chapters} isLoading={false} />;
};

const LatestWorksAdded = ({ languages }) => {
  const { loading, error, data } = useQuery(FETCH_LATEST_WORKS, {
    variables: { languages }
  });

  if (loading) return <LatestWorks blocks={[]} isLoading={true} />;
  if (error) {
    logException(JSON.stringify(error), true);
    return <LatestWorks blocks={[]} isLoading={true} />;
  }

  return <LatestWorks works={data.works} isLoading={false} />;
};

const RandomWork = ({ languages }) => {
  const { loading, error, data } = useQuery(FETCH_RANDOM_WORK, {
    variables: { languages }
  });

  if (loading) return <RecommendedWorkLoading />;
  if (error) {
    logException(JSON.stringify(error), true);
    return <RecommendedWorkLoading />;
  }

  return <RecommendedWork isLoading={false} work={data.workRandom} />;
};

export function HomeContainer() {
  const [languagesSelected] = useGlobalState('languages_filter');
  const languages = languagesSelected.map(l => l.value);

  return (
    <div className="Home">
      <>
        <Helmet>
          <meta charSet="utf-8" />
        </Helmet>
        <FormattedMessage
          id="home.title"
          defaultMessage="Home :: {title}"
          values={{ title: APP_TITLE }}
        >
          {title => (
            <Helmet>
              <title>{title}</title>
              <meta property="og:title" content={title} />
            </Helmet>
          )}
        </FormattedMessage>
        <FormattedMessage id="home.desc" defaultMessage="All releases">
          {desc => (
            <Helmet>
              <meta name="description" content={desc} />
            </Helmet>
          )}
        </FormattedMessage>
      </>
      <LatestReleases languages={languages} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <LatestWorksAdded languages={languages} />
          </div>
          <div className="col-md-4">
            <RandomWork languages={languages} />
            <DiscordWidget discordId={DISCORD_ID} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(HomeContainer);
