import React, { memo } from 'react';
import ReleaseCategory from './ReleaseCat';
import ReleaseItem from './ReleaseItem';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { languageIdToName } from '../../utils/common';

export default memo(function ReleasesList({ releases }) {
  const rows = [];
  let tempRows = [];
  let lastWork = null;

  releases
    .sort((r1, r2) => r1.work.stub.localeCompare(r2.work.stub))
    .forEach(release => {
      const { work } = release;
      if (lastWork !== null && work.stub !== lastWork) {
        rows.push(
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <ReleaseCategory work={work} key={work.stub} />
            {tempRows}
            <small className="d-block text-right mt-3">
              <Link to={`/work/${work.stub}`}>
                <FormattedMessage
                  id="all_chapters"
                  defaultMessage="All chapters"
                />
              </Link>
            </small>
          </div>
        );
        tempRows = [];
      }

      let chapterUrl = `read/${work.stub}/${languageIdToName(
        release.language
      )}/${release.volume}/${release.chapter}.${release.subchapter}`;
      tempRows.push(
        <ReleaseItem release={release} url={chapterUrl} key={release.id} />
      );
      lastWork = work.stub;
    });

  return rows;
});
