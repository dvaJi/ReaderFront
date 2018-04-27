import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faDownload from "@fortawesome/fontawesome-free-solid/faDownload";
import Button from "./Button";

export default class ReaderBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      chapters: [],
      serie: {}
    };
  }

  serieLink() {
    let url = `/serie/${this.props.serie.stub}`;
    return <Link to={url}>{this.props.serie.name}</Link>;
  }

  downloadChapter() {
    ReactGA.event({
      category: "Reader",
      action: "Downloaded a chapter",
      value: `${this.props.serie.name} capítulo ${this.props.chapter.chapter}.${
        this.props.chapter.subchapter
      }`
    });
    let url = `${this.props.chapter.download_href}`.replace("https://", "http://");
    return (
      <a className="Download" href={url} target="_blank">
        <FontAwesomeIcon icon={faDownload} />
      </a>
    );
  }

  chapterUrl(chapter) {
    if (this.props.serie.stub === undefined) {
      return "";
    }
    if (chapter === -1) {
      return `/serie/${this.props.serie.stub}`;
    }

    return `/read/${this.props.serie.stub}/${
      this.props.chapters[chapter].language
    }/${this.props.chapters[chapter].volume}/${
      this.props.chapters[chapter].chapter
    }.${this.props.chapters[chapter].subchapter}`;
  }

  render() {
    return (
      <div className="ReaderBar clearfix">
        <div className="float-left title">
          <span className="truncate">{this.serieLink()}</span>
            : Capítulo {this.props.chapter.chapter}
            {this.downloadChapter()}
        </div>
        <div className="float-right">
          <Button
            text="Cap Anterior"
            url={this.chapterUrl(this.props.prevChapter)}
            chapter={this.props.prevChapter}
          />
          {' '}
          <Button
            text="Cap Siguiente"
            url={this.chapterUrl(this.props.nextChapter)}
            chapter={this.props.nextChapter}
          />
        </div>
      </div>
    );
  }
}
