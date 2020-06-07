import React, { memo } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { chapterTitle } from '@shared/lang/chapter-title';
import { useChapterSeen } from '@hooks/useChapterSeen';
import { ANONYMIZER_DOWNLOADS } from 'lib/config';
import { logEvent } from 'lib/analytics';
import { ChapterRow, ChapterIsSeen, EndBadge } from './styles';

function Chapter({ chapter, work, isEnd }) {
  const { formatMessage: f } = useIntl();
  const { isSeen, setIsSeen } = useChapterSeen(chapter.id);

  return (
    <ChapterRow className="clearfix" isSeen={isSeen}>
      <ChapterIsSeen onClick={() => setIsSeen(!isSeen)}>
        <FontAwesomeIcon icon={isSeen ? 'eye-slash' : 'eye'} />
      </ChapterIsSeen>
      <Link
        href="/read/[slug]/[lang]/[volume]/[chapter]"
        as={chapter.read_path}
      >
        <a className="Chapter">
          {chapterTitle({ chapter, f })}
          {isEnd && (
            <EndBadge
              id="end_chapter"
              className="badge badge-pill badge-secondary"
            >
              {f({ id: 'end', defaultMessage: 'End' })}
            </EndBadge>
          )}
        </a>
      </Link>
      <div className="float-right">
        <a
          className="Download"
          href={ANONYMIZER_DOWNLOADS + chapter.download_href}
          target="_blank"
          rel="noopener noreferrer"
          title={f({
            id: 'download_chapter',
            defaultMessage: 'Download chapter'
          })}
          onClick={() => {
            logEvent(
              'Reader',
              'Download Chapter',
              `${work.name} [${work.language_name}] - ${chapter.chapter}.${chapter.subchapter}`
            );
          }}
        >
          <FontAwesomeIcon icon="download" />
        </a>
      </div>
    </ChapterRow>
  );
}

export default memo(Chapter);
