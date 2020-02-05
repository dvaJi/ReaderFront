import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { APP_URL } from '../../config';
import { Card, ButtonLinkA } from 'common/ui';

function ChapterInfo({ chapter }) {
  const chapterPath = `${APP_URL}${chapter.read_path}`;
  return (
    <Card>
      <h5>
        <FormattedMessage id="volume" defaultMessage="Volume" />{' '}
        {chapter.volume}{' '}
        <FormattedMessage id="chapter" defaultMessage="Chapter" />{' '}
        {chapter.chapter}.{chapter.subchapter}: {chapter.name}
        <span className="badge badge-secondary ml-1">
          <FormattedMessage
            id={`${chapter.language_name}_full`}
            defaultMessage={chapter.language_name}
          />
        </span>
        {chapter.hidden && (
          <span className="badge badge-danger ml-1">
            <FormattedMessage id={'hidden'} defaultMessage={'Hidden'} />
          </span>
        )}
        <ButtonLinkA
          href={chapterPath}
          target="_blank"
          color="primary"
          className="float-right"
          size="sm"
        >
          <FormattedMessage id="read_chapter" defaultMessage="Read chapter" />
        </ButtonLinkA>
      </h5>
    </Card>
  );
}

export default memo(ChapterInfo);
