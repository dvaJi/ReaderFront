import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import params from '../../params.json';
import * as config from '../../config';
import { subString } from 'utils/helpers';
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

const generateRandomBlock = previousBlock => {
  const numbers = [1, 2, 3, 5];
  const index = numbers.indexOf(previousBlock);
  const nextIndex = numbers.length - 1 === index ? 0 : index + 1;
  return numbers[nextIndex];
};

const createBlocks = chapters => {
  const blocks = [];
  let blockNumber = generateRandomBlock();

  chapters.forEach((chapter, index) => {
    if (chapters.length <= 5 && chapters.length !== 4) {
      blocks.push({ chapters: [chapter], block: chapters.length });
    } else if (blocks.length === 0) {
      blocks.push({ chapters: [chapter], block: blockNumber });
    } else if (
      blocks[blocks.length - 1].chapters.length <
      blocks[blocks.length - 1].block
    ) {
      blocks[blocks.length - 1].chapters.push(chapter);
    } else {
      do {
        blockNumber = generateRandomBlock(blockNumber);
      } while (blockNumber > chapters.length - index);
      blocks.push({ chapters: [chapter], block: blockNumber });
    }
  });

  return blocks;
};

const LatestReleases = ({ language }) => (
  <Query
    query={FETCH_RELEASES}
    variables={{ language, orderBy: 'DESC', first: 20, offset: 0 }}
  >
    {({ loading, error, data }) => {
      if (loading) return <ComicSlide blocks={[]} isLoading={true} />;
      if (error) return <ComicSlide blocks={[]} isLoading={true} />;

      return (
        <ComicSlide blocks={createBlocks(data.chapters)} isLoading={false} />
      );
    }}
  </Query>
);

const LatestWorksAdded = ({ language }) => (
  <Query query={FETCH_LATEST_WORKS} variables={{ language }}>
    {({ loading, error, data }) => {
      if (loading) return <LatestWorks blocks={[]} isLoading={true} />;
      if (error) return <LatestWorks blocks={[]} isLoading={true} />;

      return <LatestWorks works={data.works} isLoading={false} />;
    }}
  </Query>
);

const RandomWork = ({ language }) => (
  <Query query={FETCH_RANDOM_WORK} variables={{ language }}>
    {({ loading, error, data }) => {
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
    }}
  </Query>
);

class HomeContainer extends Component {
  render() {
    const { language } = this.props;
    return (
      <div className="Home">
        <HomeMetaTags />
        <LatestReleases language={params.global.languages[language].id} />
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <LatestWorksAdded
                language={params.global.languages[language].id}
              />
            </div>
            <div className="col-md-4">
              <RandomWork language={params.global.languages[language].id} />
              <DiscordWidget discordId={config.DISCORD_ID} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.layout.language
  };
};

export default connect(mapStateToProps)(HomeContainer);
