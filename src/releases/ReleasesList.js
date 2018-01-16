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
        rows.push(<ReleaseCardEmpty key={index} release={{ id: index }} />);
      }
    } else {
      this.props.releases.forEach(release => {
        let chapterUrl = `read/${release.comic.stub}/${
          release.chapter.language
        }/${release.chapter.volume}/${release.chapter.chapter}.${
          release.chapter.subchapter
        }`;
        rows.push(<ReleaseCard key={release.id} chapterUrl={chapterUrl} release={release} />);
      });

      if (isFetchingData) {
        for (let index = 0; index < 15; index++) {
          rows.push(<ReleaseCardEmpty key={index} release={{ id: index }} />);
        }
      }
    }

    return rows;
  }
}
