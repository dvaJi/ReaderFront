import React, { memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useIntl, FormattedMessage } from 'react-intl';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import { DISCORD_ID, APP_TITLE } from 'lib/config';
import { subString } from '@shared/is';
import { languages } from '@shared/params/global';

import ComicSlide from '@components/ComicSlide';
import DiscordWidget from '@components/DiscordWidget';
import RecommendedWork from '@components/RecommendedWork';
import RecommendedWorkLoading from '@components/RecommendedWork/RecommendedWorkLoading';
import LatestWorks from '@components/LatestWorks';

export const FETCH_RELEASES = gql`
  query HomeChapters(
    $language: Int
    $orderBy: String
    $first: Int
    $offset: Int
  ) {
    chapters(
      language: $language
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
  query LatestWorks($language: Int) {
    works(
      language: $language
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
      works_descriptions {
        description
      }
    }
  }
`;

export const FETCH_RANDOM_WORK = gql`
  query RandomWork($language: Int) {
    workRandom(language: $language) {
      id
      name
      stub
      uniqid
      type
      demographicId
      status
      adult
      thumbnail_path
      works_descriptions {
        description
      }
    }
  }
`;

const LatestReleases = ({ language }) => {
  const { loading, error, data } = useQuery(FETCH_RELEASES, {
    variables: { language, orderBy: 'DESC', first: 20, offset: 0 }
  });

  if (loading) return <ComicSlide chapters={[]} isLoading={true} />;
  if (error) return <ComicSlide chapters={[]} isLoading={true} />;

  return <ComicSlide chapters={data.chapters} isLoading={false} />;
};

const LatestWorksAdded = ({ language }) => {
  const { loading, error, data } = useQuery(FETCH_LATEST_WORKS, {
    variables: { language }
  });

  if (loading) return <LatestWorks blocks={[]} isLoading={true} />;
  if (error) return <LatestWorks blocks={[]} isLoading={true} />;

  return <LatestWorks works={data.works} isLoading={false} />;
};

const RandomWork = ({ language }) => {
  const { loading, error, data } = useQuery(FETCH_RANDOM_WORK, {
    variables: { language }
  });

  if (loading) return <RecommendedWorkLoading />;
  if (error) return <RecommendedWorkLoading />;

  const description =
    data.workRandom !== null
      ? subString(data.workRandom.works_descriptions[0].description, 175)
      : '';

  return (
    <RecommendedWork
      isLoading={false}
      work={data.workRandom}
      description={description}
    />
  );
};

export function HomeContainer() {
  const { locale } = useIntl();
  const language = languages[locale];

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
      <LatestReleases language={language.id} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <LatestWorksAdded language={language.id} />
          </div>
          <div className="col-md-4">
            <RandomWork language={language.id} />
            <DiscordWidget discordId={DISCORD_ID} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(HomeContainer);
