import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import * as config from "../config";
import DisqusThread from "../common/DisqusComments";
import ReaderBar from "./ReaderBar";
import ImagesList from "./ImagesList";
import ReaderEmpty from "./ReaderEmpty";
import "./Reader.css";

export default class Reader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      pageSelected: 0,
      cascade: true,
      nextChapter: 0,
      prevChapter: 0,
      chapter: {
        comic: {
          name: ""
        }
      },
      chapters: [],
      pages: [{ filename: "", thumb_url: "" }],
      disqusConfig: {
        id: "",
        path: "",
        title: ""
      }
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.handlePageSelectedChange = this.handlePageSelectedChange.bind(this);
    this.handleCascadeModeChange = this.handleCascadeModeChange.bind(this);
    this.handleChapterChange = this.handleChapterChange.bind(this);
    this.handleDisqusChange = this.handleDisqusChange.bind(this);
  }

  handleDisqusChange(chapter) {
    this.setState({
      disqusConfig: {
        id: `${chapter.comic.uniqid}-${chapter.uniqid}`,
        path: `/read/${chapter.comic.stub}/${chapter.language}/${
          chapter.volume
        }/${chapter.chapter}.${chapter.subchapter}`,
        title: `${chapter.comic.name} - Capítulo ${chapter.chapter}`
      }
    });
  }

  handlePageSelectedChange(page) {
    this.setState({
      pageSelected: page
    });
  }

  handleChapterChange(chapter) {
    this.setState({ chapter: chapter });
    this.setState({ pages: chapter.pages });
    let chapters = this.state.chapters;
    let nextChapter =
      chapters.indexOf(chapter) !== 0 ? chapters.indexOf(chapter) - 1 : -1;
    let prevChapter =
      chapters.indexOf(chapter) + 1 !== chapters.length
        ? chapters.indexOf(chapter) + 1
        : -1;
    this.setState({ nextChapter: nextChapter });
    this.setState({ prevChapter: prevChapter });
  }

  handleCascadeModeChange(mode) {
    this.setState({
      cascade: mode
    });
  }

  componentWillReceiveProps(newProps) {
    let newChapter = this.state.chapters.find(
      chapter =>
        chapter.chapter === newProps.match.params.chapter &&
        chapter.subchapter === newProps.match.params.subchapter
    );
    this.handleChapterChange(newChapter);
  }

  async componentDidMount() {
    try {
      const results = await this.getChapters();
      this.setState({
        chapters: results
      });

      let chapter = results.find((chapter, index) => {
        return (
          chapter.chapter === this.props.match.params.chapter &&
          chapter.subchapter === this.props.match.params.subchapter
        );
      });
      this.setState({ chapter: chapter });
      this.setState({ pages: chapter.pages });
      let nextChapter =
        results.indexOf(chapter) !== 0 ? results.indexOf(chapter) - 1 : -1;
      let prevChapter =
        results.indexOf(chapter) + 1 !== results.length
          ? results.indexOf(chapter) + 1
          : -1;
      this.setState({ nextChapter: nextChapter });
      this.setState({ prevChapter: prevChapter });
      this.handleDisqusChange(chapter);
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  getChapters() {
    return fetch(
      config.READER_PATH + "v1/chapters?stub=" + this.props.match.params.stub
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(chapters) {
        return chapters.sort((a, b) => b.chapter - a.chapter);
      });
  }

  renderChapter() {
    return (
      <div className="Read">
        <MetaTags>
          <title>
            {this.state.chapter.comic.name +
              " Capítulo " +
              this.state.chapter.chapter +
              " - " +
              config.APP_TITLE}
          </title>
          <meta
            name="description"
            content={
              "Capítulo " +
              this.state.chapter.chapter +
              " de " +
              this.state.chapter.comic.name
            }
          />
          <meta
            property="og:title"
            content={
              this.state.chapter.comic.name +
              " Capítulo " +
              this.state.chapter.chapter +
              " - " +
              config.APP_TITLE
            }
          />
        </MetaTags>
        <ReaderBar
          chapter={this.state.chapter}
          chapters={this.state.chapters}
          serie={this.state.chapter.comic}
          prevChapter={this.state.prevChapter}
          nextChapter={this.state.nextChapter}
        />
        <ImagesList
          id={this.state.chapter.id}
          loading={this.state.isLoading}
          cascade={this.state.cascade}
          pageSelected={this.state.pageSelected}
          onPageSelected={this.handlePageSelectedChange}
          onChapterChange={this.handleChapterChange}
          pages={this.state.pages}
        />
        <DisqusThread
          id={this.state.disqusConfig.id}
          title={this.state.disqusConfig.title}
          path={this.state.disqusConfig.path}
        />
      </div>
    );
  }

  renderShimme() {
    return <ReaderEmpty />;
  }

  render() {
    if (!this.state.isLoading) {
      return this.renderChapter();
    } else {
      return this.renderShimme();
    }
  }
}
