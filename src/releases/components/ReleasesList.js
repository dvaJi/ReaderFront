import React, { PureComponent } from 'react';
import ReleaseCard from './ReleaseCard';
import ReleaseCardEmpty from './ReleaseCardEmpty';
import { getChapterPageUrl, languageIdToName } from '../../utils/common';

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
        rows.push(<ReleaseCardEmpty key={'A' + index} />);
      }
    } else {
      this.props.releases.forEach(release => {
        let chapter = release;
        let work = release.work;
        let chapterUrl = `read/${work.stub}/${languageIdToName(
          chapter.language
        )}/${chapter.volume}/${chapter.chapter}.${chapter.subchapter}`;
        rows.push(
          <ReleaseCard
            key={release.id}
            url={chapterUrl}
            name={work.name}
            thumb={getChapterPageUrl(work, chapter, chapter.thumbnail, 'small')}
            chapter={chapter.chapter}
            subchapter={chapter.subchapter}
            isAdult={work.adult}
          />
        );
      });
    }

    if (isLoading && this.props.releases.length !== 0 && page !== 1) {
      for (let index = 0; index < 15; index++) {
        rows.push(<ReleaseCardEmpty key={'A' + index} />);
      }
    }

    return rows;
  }
}
