import React, { memo } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import ReleaseCategory from './ReleaseCat';
import ReleaseItem from './ReleaseItem';
import { ReleaseCard } from './styles';

export default memo(function ReleasesList({ releases }) {
  const { formatMessage: f } = useIntl();
  const rows = [];
  let tempRows = [];
  let lastWork = null;

  releases
    .sort((r1, r2) => r1.work.stub.localeCompare(r2.work.stub))
    .forEach(release => {
      const { work } = release;
      if (lastWork !== null && work.stub !== lastWork.stub) {
        rows.push(
          <ReleaseCard
            key={lastWork.stub}
            className="my-3 p-3 rounded shadow-sm"
          >
            <ReleaseCategory work={lastWork} key={lastWork.stub} />
            {tempRows}
            <small className="d-block text-right mt-3">
              <Link
                href="/work/[lang]/[slug]"
                as={`/work/${lastWork.language_name}/${lastWork.stub}`}
              >
                <a>
                  {f({ id: 'all_chapters', defaultMessage: 'All chapters' })}
                </a>
              </Link>
            </small>
          </ReleaseCard>
        );
        tempRows = [];
      }

      tempRows.push(
        <ReleaseItem
          release={release}
          url={release.read_path}
          key={release.id}
        />
      );
      lastWork = work;
    });

  return rows;
});
