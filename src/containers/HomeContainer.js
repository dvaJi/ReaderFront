import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchReleases } from "../releases/actions/doReleases";
import { fetchRandomSerie } from "../serie/actions/doSerie";
import { fetchSeries } from "../series/actions/doSeries";
import * as config from "../config";
import ComicSlide from "../components/ComicSlide";
import DiscordWidget from "../components/DiscordWidget";
import RecommendedComic from "../components/RecommendedComic";
import LatestSeries from "../components/LatestSeries";

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
      disqusConfig: {
        id: "",
        path: "",
        title: ""
      }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.language !== this.props.language) {
      this.props.loadChapters(newProps.language, 1);
      this.props.recommendedSerie(newProps.language);
      this.props.getLatestSeries(newProps.language, "desc_created", 10);
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
      if (blocks.length === 0) {
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
      this.props.loadChapters(this.props.language, 1);
    }

    if (this.props.randomSerie === null) {
      this.props.recommendedSerie(this.props.language);
    }

    if (this.props.latestSeries.length === 0) {
      this.props.getLatestSeries(this.props.language, "desc_created", 10);
    }

    if (this.props.chapters.length > 0 && this.state.blocks.length === 0) {
      this.createBlocks(this.props.chapters);
    }
  }

  renderMetatags() {
    return (
      <MetaTags>
        <title>{config.APP_TITLE + " - " + this.context.t("Inicio")}</title>
        <meta
          name="description"
          content={this.context.t("Capítulos más recientes")}
        />
        <meta
          property="og:title"
          content={
            config.APP_TITLE + " - " + this.context.t("Capítulos más recientes")
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
              <LatestSeries
                title={this.context.t("Añadidos recientemente")}
                series={this.props.latestSeries}
                isLoading={this.props.latestSeriesIsLoading}
              />
            </div>
            <div className="col-md-4">
              <RecommendedComic
                isLoading={this.props.serieRandomIsLoading}
                title={this.context.t("Recomendación")}
                serie={this.props.randomSerie}
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
    randomSerie: state.serie.randomSerie,
    serieRandomIsLoading: state.serie.serieRandomIsLoading,
    latestSeries: state.series.latestSeries,
    latestSeriesIsLoading: state.series.latestSeriesIsLoading,
    isLoadingChapters: state.releases.releasesIsLoading,
    hasErrored: state.releases.releasesHasErrored,
    language: state.i18nState.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadChapters: (lang, page) => dispatch(fetchReleases(lang, page)),
    recommendedSerie: lang => dispatch(fetchRandomSerie(lang)),
    getLatestSeries: (lang, sort, perPage) =>
      dispatch(fetchSeries(lang, sort, perPage))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeContainer)
);
