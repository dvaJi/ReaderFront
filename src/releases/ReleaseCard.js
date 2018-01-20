import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ReleaseCard extends Component {
  render() {
    const { release, chapterUrl } = this.props;
    return (
      <Link to={chapterUrl}>
        <div className="release-card col-md-2 col-xs-12">
          <div className="card-img" style={release.style}>
            {""}
          </div>
          <div className="card-data">
            <h5>{release.comic.name}</h5>
            <span>
              <div title="Capítulo">
                Capítulo {release.chapter.chapter}
                {Number(release.chapter.subchapter) !== 0
                  ? "." + release.chapter.subchapter
                  : ""}
              </div>
            </span>
          </div>
        </div>
      </Link>
    );
  }
}
