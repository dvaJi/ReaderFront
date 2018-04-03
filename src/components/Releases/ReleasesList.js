import React, { Component } from "react";
import ReleaseCard from "./ReleaseCard";
import ReleaseCardEmpty from "./ReleaseCardEmpty";

export default class ReleasesList extends Component {
  render() {
    let isLoading = this.props.loading;
    let isFetchingData = this.props.isFetchingData;
    let rows = [];

    if (isLoading) {
      for (let index = 0; index < 15; index++) {
        rows.push(<ReleaseCardEmpty key={index} />);
      }
    } else {
      this.props.releases.forEach(release => {
        let chapter = release.chapter;
        let comic = release.comic;
        let chapterUrl = `read/${comic.stub}/${chapter.language}/${
          chapter.volume
        }/${chapter.chapter}.${chapter.subchapter}`;
        rows.push(
          <ReleaseCard
            key={release.id}
            url={chapterUrl}
            name={comic.name}
            thumb={chapter.thumbnail}
            chapter={chapter.chapter}
            subchapter={chapter.subchapter}
          />
        );
      });

      if (isFetchingData) {
        let releasesIndex = this.props.releases.length;
        for (let index = releasesIndex; index < releasesIndex + 15; index++) {
          rows.push(<ReleaseCardEmpty key={index} />);
        }
      }
    }

    return rows;
  }
}
