import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

class ReaderBar extends PureComponent {
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
    const { chapter, subchapter } = this.props.chapter;
    let url = `${this.props.chapter.download_href}`.replace(
      "https://",
      "http://"
    );
    return (
      <a
        className="Download"
        href={url}
        onClick={e =>
          this.createGAEvent(
            "Downloaded a chapter",
            `${this.props.serie.name} - ${chapter}.${subchapter}`
          )
        }
        target="_blank"
      >
        <FontAwesomeIcon icon={faDownload} />
      </a>
    );
  }

  chapterUrl(chapter) {
    if (
      this.props.serie.stub === undefined ||
      this.props.chapters[chapter] === undefined
    ) {
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

  createGAEvent(action, label) {
    ReactGA.event({
      category: "Reader",
      action: action,
      label: label,
      value: 1
    });
  }

  render() {
    return (
      <div className="ReaderBar clearfix">
        <div className="float-left title">
          <span className="truncate">{this.serieLink()}</span>
          : {this.context.t("Capítulo")} {this.props.chapter.chapter}
          {this.downloadChapter()}
        </div>
        <div className="float-right">
          <Button
            text={this.context.t("Cap Anterior")}
            gaEvent={this.createGAEvent}
            url={this.chapterUrl(this.props.prevChapter)}
            chapter={this.props.prevChapter}
          />{" "}
          <Button
            text={this.context.t("Cap Siguiente")}
            gaEvent={this.createGAEvent}
            url={this.chapterUrl(this.props.nextChapter)}
            chapter={this.props.nextChapter}
          />
        </div>
      </div>
    );
  }
}

ReaderBar.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ReaderBar;
