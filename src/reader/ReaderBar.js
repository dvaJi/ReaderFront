import React, { Component } from "react";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faDownload from "@fortawesome/fontawesome-free-solid/faDownload";
import Button from "./Button";

export default class ReaderBar extends Component {
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
    let url = `${this.props.chapter.download_href}`;
    return (
      <Link className="Download" to={url}>
        <FontAwesomeIcon icon={faDownload} />
      </Link>
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
      <div className="ReaderBar">
        <div className="col-md-9 title">
          <div className="col-md-9 truncate">{this.serieLink()}</div>
          <div className="col-md-3">
            Capítulo {this.props.chapter.chapter}
            {this.downloadChapter()}
          </div>
        </div>
        <div className="col-md-3">
          <Button
            text="Cap Anterior"
            url={this.chapterUrl(this.props.prevChapter)}
            chapter={this.props.prevChapter}
          />
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
