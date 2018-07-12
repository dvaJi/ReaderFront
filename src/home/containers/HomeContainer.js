import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchReleases } from '../../releases/actions/doReleases';
import { fetchRandomWork } from '../../work/actions/doWork';
import { fetchWorks } from '../../works/actions/doWorks';
import * as config from '../../config';
import { subString } from '../../utils/helpers';

// UI
import ComicSlide from '../components/ComicSlide';
import DiscordWidget from '../components/DiscordWidget';
import RecommendedWork from '../components/RecommendedWork';
import LatestWorks from '../components/LatestWorks';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
      disqusConfig: {
        id: '',
        path: '',
        title: ''
      }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.language !== this.props.language) {
      this.props.loadChapters(newProps.language, 0);
      this.props.recommendedWork(newProps.language);
      this.props.getLatestWorks(newProps.language, 'DESC', 10);
    }

    if (
      this.props.chapters.length === 0 ||
      (this.props.chapters.length > 0 &&
        this.props.chapters[0] !== newProps.chapters[0])
    ) {
      this.createBlocks(newProps.chapters);
    }
  }

  generateRandomBlock(previousBlock) {
    var num = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    return num === 4 || num === previousBlock
      ? this.generateRandomBlock()
      : num;
  }

  createBlocks(chapters) {
    const blocks = [];
    let blockNumber = this.generateRandomBlock();

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
          blockNumber = this.generateRandomBlock(blockNumber);
        } while (blockNumber > chapters.length - index);
        blocks.push({ chapters: [chapter], block: blockNumber });
      }
    });

    this.setState({ blocks: blocks });
  }

  componentDidMount() {
    if (this.props.chapters.length === 0) {
      this.props.loadChapters(this.props.language, 0);
    }

    if (this.props.randomWork === null) {
      this.props.recommendedWork(this.props.language);
    }

    if (this.props.latestWorks.length === 0) {
      this.props.getLatestWorks(this.props.language, 'DESC', 10);
    }

    if (this.props.chapters.length > 0 && this.state.blocks.length === 0) {
      this.createBlocks(this.props.chapters);
    }
  }

  renderMetatags() {
    return (
      <MetaTags>
        <title>{config.APP_TITLE + ' - ' + this.context.t('Inicio')}</title>
        <meta
          name="description"
          content={this.context.t('Capítulos más recientes')}
        />
        <meta
          property="og:title"
          content={
            config.APP_TITLE + ' - ' + this.context.t('Capítulos más recientes')
          }
        />
      </MetaTags>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.renderMetatags()}
        <ComicSlide
          blocks={this.state.blocks}
          isLoading={this.props.isLoadingChapters}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <LatestWorks
                title={this.context.t('Añadidos recientemente')}
                works={this.props.latestWorks}
                isLoading={this.props.latestWorksIsLoading}
              />
            </div>
            <div className="col-md-4">
              <RecommendedWork
                isLoading={this.props.workRandomIsLoading}
                title={this.context.t('Recomendación')}
                work={this.props.randomWork}
                description={
                  this.props.randomWork !== null
                    ? subString(this.props.randomWork.description, 175)
                    : ''
                }
              />
              <DiscordWidget discordId={config.DISCORD_ID} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomeContainer.contextTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    chapters: state.releases.chapters,
    page: state.releases.releasesPage,
    randomWork: state.work.randomWork,
    workRandomIsLoading: state.work.workRandomIsLoading,
    latestWorks: state.works.latestWorks,
    latestWorksIsLoading: state.works.latestWorksIsLoading,
    isLoadingChapters: state.releases.releasesIsLoading,
    hasErrored: state.releases.releasesHasErrored,
    language: state.i18nState.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadChapters: (lang, page) => dispatch(fetchReleases(lang, page)),
    recommendedWork: lang => dispatch(fetchRandomWork(lang)),
    getLatestWorks: (lang, sort, perPage) =>
      dispatch(fetchWorks(lang, sort, perPage))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeContainer)
);
