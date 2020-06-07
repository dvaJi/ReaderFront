import React, { memo } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import ReleaseCategory from './ReleaseCat';
import ReleaseItem from './ReleaseItem';
import { ReleaseCard } from './styles';

export default memo(function ReleasesList({ releases }) {
  const { formatMessage: f } = useIntl();
  let worksMap = {};

  releases
    .sort((r1, r2) => r1.work.stub.localeCompare(r2.work.stub))
    .forEach(release => {
      const { work } = release;

      if (!worksMap[work.stub]) {
        worksMap[work.stub] = {
          work,
          releases: []
        };
      }

      worksMap[work.stub].releases.push(
        <ReleaseItem
          release={release}
          url={release.read_path}
          key={release.id}
        />
      );
    });

  return Object.keys(worksMap).map(key => (
    <ReleaseCard
      key={worksMap[key].work.stub}
      className="my-3 p-3 rounded shadow-sm"
    >
      <ReleaseCategory work={worksMap[key].work} />
      {worksMap[key].releases.map(releases => releases)}
      <small className="d-block text-right mt-3">
        <Link
          href="/work/[lang]/[slug]"
          as={`/work/${worksMap[key].work.language_name}/${worksMap[key].work.stub}`}
        >
          <a>{f({ id: 'all_chapters', defaultMessage: 'All chapters' })}</a>
        </Link>
      </small>
    </ReleaseCard>
  ));
});
