import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { fetchReleases, releasesPage } from '../actions/doReleases';
import ReleasesList from '../components/ReleasesList';
import * as config from '../../config';

class ReleasesContainer extends Component {
  constructor(props) {
    super(props);

    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
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
    window.removeEventListener('scroll', this.handleOnScroll);
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
        ? (Math.ceil(scrollTop + clientHeight) * 100) / scrollHeight
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

  renderMetatags() {
    const title = config.APP_TITLE;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
        </Helmet>
        <FormattedMessage
          id="releases.title"
          defaultMessage="{title} - All chapters"
          values={{ title: title }}
        >
          {title => (
            <Helmet>
              <title>{title}</title>
              <meta property="og:title" content={title} />
            </Helmet>
          )}
        </FormattedMessage>
        <FormattedMessage id="releases.desc" defaultMessage="All releases">
          {desc => (
            <Helmet>
              <meta name="description" content={desc} />
            </Helmet>
          )}
        </FormattedMessage>
      </div>
    );
  }

  render() {
    let { chapters, isLoading, page } = this.props;
    return (
      <div className="Releases">
        {this.renderMetatags()}
        <ReleasesList loading={isLoading} releases={chapters} page={page} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chapters: state.releases.chapters,
    page: state.releases.releasesPage,
    isLoading: state.releases.releasesIsLoading,
    hasErrored: state.releases.releasesHasErrored,
    language: state.layout.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadChapters: (lang, page) => dispatch(fetchReleases(lang, page)),
    changePage: page => dispatch(releasesPage(page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleasesContainer);
