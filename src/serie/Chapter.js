import React, { Component } from "react";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faDownload from "@fortawesome/fontawesome-free-solid/faDownload";

export default class Chapter extends Component {
  render() {
    const { serie, chapter } = this.props;
    return (
      <li>
        <Link
          to={`/read/${serie.stub}/${chapter.language}/${chapter.volume}/${
            chapter.chapter
          }.${chapter.subchapter}`}
          className="Chapter"
        >
          Capítulo {chapter.chapter}
          {chapter.subchapter !== "0" ? "." + chapter.subchapter : ""}
          {chapter.name !== "" ? `: ${chapter.name}` : ""}
        </Link>
        <div className="pull-right">
          <Link className="Download" to={chapter.download_href}>
            <FontAwesomeIcon icon={faDownload} />
          </Link>
        </div>
      </li>
    );
  }
}
