import React, { Component } from "react";
import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { fetchReleases, releasesPage } from "../actions/doReleases";
import ReleasesList from "../components/ReleasesList";
import * as config from "../../config";

class ReleasesContainer extends Component {
  constructor(props) {
    super(props);

    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
    if (this.props.chapters.length === 0) {
      try {
        this.props.loadChapters(this.props.language, this.props.page);
      } catch (e) {
        console.error(e);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      this.props.changePage(1);
      this.props.loadChapters(nextProps.language, this.props.page);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  isScrolledToBottom() {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    var perScroll =
      scrollHeight > 0
        ? Math.ceil(scrollTop + clientHeight) * 100 / scrollHeight
        : 0;

    return perScroll >= 85;
  }

  handleOnScroll() {
    if (!this.props.isLoading) {
      let scrolledToBottom = this.isScrolledToBottom();
      if (scrolledToBottom && !this.props.isLoading) {
        this.props.changePage(this.props.page + 1);
        this.props.loadChapters(this.props.language, this.props.page);
      }
    }
  }

  render() {
    let { chapters, isLoading, page } = this.props;
    return (
      <div className="Releases">
        <MetaTags>
          <title>{config.APP_TITLE + " - " + this.context.t("Capítulos más recientes")}</title>
          <meta name="description" content={this.context.t("Capítulos más recientes")} />
          <meta
            property="og:title"
            content={config.APP_TITLE + " - " + this.context.t("Capítulos más recientes")}
          />
        </MetaTags>
        <ReleasesList loading={isLoading} releases={chapters} page={page} />
      </div>
    );
  }
}

ReleasesContainer.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    chapters: state.releases.chapters,
    page: state.releases.releasesPage,
    isLoading: state.releases.releasesIsLoading,
    hasErrored: state.releases.releasesHasErrored,
    language: state.i18nState.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadChapters: (lang, page) => dispatch(fetchReleases(lang, page)),
    changePage: page => dispatch(releasesPage(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReleasesContainer);
