import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// App imports
import { fetchChapters, readerSelectChapter } from '../actions/doReader';
import { getChapterPageUrl } from '../../utils/common';
import * as config from '../../config';

import ReaderBar from '../components/ReaderBar';
import ImagesList from '../components/ImagesList';
import ReaderEmpty from '../components/ReaderEmpty';
import Comments from '../components/Comments';

class ReaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextChapter: 0,
      prevChapter: 0,
      disqusConfig: {
        id: '',
        path: '',
        title: ''
      }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.handleChapterChange = this.handleChapterChange.bind(this);
    this.handleDisqusChange = this.handleDisqusChange.bind(this);
  }

  handleDisqusChange(chapter) {
    const lang = this.props.match.params.lang || 'es';
    this.setState({
      disqusConfig: {
        id: `${chapter.work.uniqid}-${chapter.uniqid}`,
        path: `/read/${chapter.work.stub}/${chapter.language}/${
          chapter.volume
        }/${chapter.chapter}.${chapter.subchapter}`,
        title: `${chapter.work.name} - Capítulo ${
          chapter.chapter
        } | ${lang.toUpperCase()} `
      }
    });
  }

  handleChapterChange(chapter, chapters) {
    this.props.selectChapter(chapter);
    this.handleDisqusChange(chapter);
    let prevChapter =
      chapters.indexOf(chapter) !== 0 ? chapters.indexOf(chapter) - 1 : -1;
    let nextChapter =
      chapters.indexOf(chapter) + 1 !== chapters.length
        ? chapters.indexOf(chapter) + 1
        : -1;
    this.setState({ nextChapter: nextChapter });
    this.setState({ prevChapter: prevChapter });
  }

  // New props validations
  isNewSerie = newProps =>
    this.props.match.params.stub !== newProps.match.params.stub ||
    (this.props.chapters.length > 0 &&
      this.props.chapters[0].work.stub !== newProps.match.params.stub);
  isNewChapter = newProps =>
    this.props.chapter.chapter !== Number(newProps.match.params.chapter) ||
    this.props.chapter.subchapter !== Number(newProps.match.params.subchapter);

  componentWillReceiveProps(newProps) {
    if (this.isNewSerie(newProps)) {
      const lang = this.props.match.params.lang || 'es';
      this.props.getChapters(lang, this.props.match.params.stub);
    } else if (this.props.chapter === null || this.isNewChapter(newProps)) {
      let newChapter = newProps.chapters.find(
        chapter =>
          chapter.chapter === Number(newProps.match.params.chapter) &&
          chapter.subchapter === Number(newProps.match.params.subchapter)
      );

      if (newChapter === undefined) {
        throw Error('Capítulo no encontrado');
      }

      this.handleChapterChange(newChapter, newProps.chapters);
    }
  }

  componentDidMount() {
    try {
      const lang = this.props.match.params.lang || 'es';
      this.props.getChapters(lang, this.props.match.params.stub);
    } catch (e) {
      console.error(e);
    }
  }

  renderChapter() {
    const { chapter, chapters, isLoading } = this.props;
    const title = `${chapter.work.name} Capítulo ${chapter.chapter}`;
    return (
      <div className="Read">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${title} - ${config.APP_TITLE}`}</title>
          <meta
            name="description"
            content={`${title} de ${chapter.work.name}`}
          />
          <meta
            property="og:title"
            content={`${title} - ${config.APP_TITLE}`}
          />
          <meta
            property="og:image"
            content={getChapterPageUrl(
              chapter.work,
              chapter,
              chapter.thumbnail
            )}
          />
        </Helmet>
        <ReaderBar
          chapter={chapter}
          chapters={chapters}
          work={chapter.work}
          prevChapter={this.state.prevChapter}
          nextChapter={this.state.nextChapter}
        />
        <ImagesList
          id={chapter.id}
          loading={isLoading}
          onChapterChange={this.handleChapterChange}
          pages={chapter.pages}
          chapter={chapter}
        />
        <Comments
          id={this.state.disqusConfig.id}
          title={this.state.disqusConfig.title}
          path={this.state.disqusConfig.path}
        />
      </div>
    );
  }

  render() {
    if (!this.props.isLoading && this.props.chapter) {
      return this.renderChapter();
    } else {
      return <ReaderEmpty />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    chapters: state.reader.chapters,
    chapter: state.reader.chapter,
    isLoading: state.reader.readerIsLoading,
    hasErrored: state.reader.readerHasErrored,
    match: state.match || ownProps.match,
    language: state.layout.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChapters: (lang, stub) => dispatch(fetchChapters(lang, stub)),
    selectChapter: chapter => dispatch(readerSelectChapter(chapter))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReaderContainer)
);
