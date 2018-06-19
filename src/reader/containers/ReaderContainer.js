import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchChapters, readerSelectChapter } from "../actions/doReader";
import * as config from "../../config";
import ReaderBar from "../components/ReaderBar";
import ImagesList from "../components/ImagesList";
import ReaderEmpty from "../components/ReaderEmpty";
import Comments from "../components/Comments";

class ReaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextChapter: 0,
      prevChapter: 0,
      disqusConfig: {
        id: "",
        path: "",
        title: ""
      }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.handleChapterChange = this.handleChapterChange.bind(this);
    this.handleDisqusChange = this.handleDisqusChange.bind(this);
  }

  handleDisqusChange(chapter) {
    const lang = this.props.params.lang || "es";
    this.setState({
      disqusConfig: {
        id: `${chapter.comic.uniqid}-${chapter.uniqid}`,
        path: `/read/${chapter.comic.stub}/${chapter.language}/${
          chapter.volume
        }/${chapter.chapter}.${chapter.subchapter}`,
        title: `${chapter.comic.name} - Capítulo ${
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
  isChapterEmpty = newProps =>
    this.props.chapter === null && newProps.chapters.length > 0;
  isNewSerie = newProps => this.props.params.stub !== newProps.params.stub;
  isNewChapter = newProps =>
    this.props.params.chapter !== newProps.params.chapter ||
    this.props.params.subchapter !== newProps.params.subchapter;
  serieHasChanged = newProps =>
    newProps.chapter &&
    newProps.chapters.length > 0 &&
    newProps.chapters[0].language === this.props.params.lang &&
    newProps.chapters[0].comic.stub === this.props.params.stub &&
    (newProps.chapter.chapter !== this.props.params.chapter ||
      newProps.chapter.subchapter !== this.props.params.subchapter);

  componentWillReceiveProps(newProps) {
    if (this.isNewSerie(newProps)) {
      const lang = this.props.params.lang || "es";
      this.props.getChapters(lang, this.props.params.stub);
    } else if (
      this.isChapterEmpty(newProps) ||
      this.isNewChapter(newProps) ||
      this.serieHasChanged(newProps)
    ) {
      let newChapter = newProps.chapters.find(
        chapter =>
          chapter.chapter === newProps.params.chapter &&
          chapter.subchapter === newProps.params.subchapter
      );

      this.handleChapterChange(newChapter, newProps.chapters);
    }
  }

  componentDidMount() {
    try {
      const lang = this.props.params.lang || "es";
      this.props.getChapters(lang, this.props.params.stub);
    } catch (e) {
      console.error(e);
    }
  }

  renderChapter() {
    return (
      <div className="Read">
        <MetaTags>
          <title>
            {this.props.chapter.comic.name +
              " Capítulo " +
              this.props.chapter.chapter +
              " - " +
              config.APP_TITLE}
          </title>
          <meta
            name="description"
            content={
              "Capítulo " +
              this.props.chapter.chapter +
              " de " +
              this.props.chapter.comic.name
            }
          />
          <meta
            property="og:title"
            content={
              this.props.chapter.comic.name +
              " Capítulo " +
              this.props.chapter.chapter +
              " - " +
              config.APP_TITLE
            }
          />
        </MetaTags>
        <ReaderBar
          chapter={this.props.chapter}
          chapters={this.props.chapters}
          serie={this.props.chapter.comic}
          prevChapter={this.state.prevChapter}
          nextChapter={this.state.nextChapter}
        />
        <ImagesList
          id={this.props.chapter.id}
          loading={this.props.isLoading}
          onChapterChange={this.handleChapterChange}
          pages={this.props.chapter.pages}
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
    params: ownProps.match.params,
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
