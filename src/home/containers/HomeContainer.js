import React, { memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useIntl } from 'react-intl';

import { DISCORD_ID } from '../../config';
import { subString } from 'utils/helpers';
import { languageNameToId } from 'utils/common';
import {
  FETCH_RELEASES,
  FETCH_LATEST_WORKS,
  FETCH_RANDOM_WORK
} from './queries';

// UI
import HomeMetaTags from './HomeMetaTags';
import ComicSlide from '../components/ComicSlide';
import DiscordWidget from '../components/DiscordWidget';
import RecommendedWork from '../components/RecommendedWork';
import RecommendedWorkLoading from '../components/RecommendedWork/RecommendedWorkLoading';
import LatestWorks from '../components/LatestWorks';

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

function HomeContainer() {
  const { locale } = useIntl();
  const language = languageNameToId(locale);

  return (
    <div className="Home">
      <HomeMetaTags />
      <LatestReleases language={language} />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <LatestWorksAdded language={language} />
          </div>
          <div className="col-md-4">
            <RandomWork language={language} />
            <DiscordWidget discordId={DISCORD_ID} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(HomeContainer);
