import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Card, ButtonLink } from 'common/ui';

function ChapterInfo({ lang, chapter }) {
  const chapterPath = `/read/${chapter.work.stub}/${lang}/${chapter.volume}/${chapter.chapter}.${chapter.subchapter}`;
  return (
    <Card>
      <h5>
        <FormattedMessage id="volume" defaultMessage="Volume" />{' '}
        {chapter.volume}{' '}
        <FormattedMessage id="chapter" defaultMessage="Chapter" />{' '}
        {chapter.chapter}.{chapter.subchapter}: {chapter.name}
        <span className="badge badge-secondary ml-1">
          <FormattedMessage id={lang + '_full'} defaultMessage={lang} />
        </span>
        {chapter.hidden && (
          <span className="badge badge-danger ml-1">
            <FormattedMessage id={'hidden'} defaultMessage={'Hidden'} />
          </span>
        )}
        <ButtonLink
          to={chapterPath}
          color="primary"
          className="float-right"
          size="sm"
        >
          <FormattedMessage id="read_chapter" defaultMessage="Read chapter" />
        </ButtonLink>
      </h5>
    </Card>
  );
}

export default memo(ChapterInfo);
