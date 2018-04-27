import React, { PureComponent } from "react";
import ReleaseCard from "./ReleaseCard";
import ReleaseCardEmpty from "./ReleaseCardEmpty";

export default class ReleasesList extends PureComponent {
  render() {
    let isLoading = this.props.loading;
    let page = this.props.page;
    let rows = [];

    if (
      (isLoading && this.props.releases.length === 0) ||
      (isLoading && page === 1)
    ) {
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
    }

    if (isLoading && this.props.releases.length !== 0) {
      for (let index = 0; index < 15; index++) {
        rows.push(<ReleaseCardEmpty key={index} />);
      }
    }

    return rows;
  }
}
