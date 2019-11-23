import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { chapterTitle } from 'utils/common';
import { useChapterSeen } from 'common/useChapterSeen';
import { ANONYMIZER_DOWNLOADS } from '../../config';
import { ChapterRow, ChapterIsSeen } from './styles';

function Chapter({ work, chapter, language }) {
  const { formatMessage: f } = useIntl();
  const dir = `${work.stub}/${language.name}/${chapter.volume}/${chapter.chapter}.${chapter.subchapter}`;
  const { isSeen, setIsSeen } = useChapterSeen(chapter.id);

  return (
    <ChapterRow className="clearfix" isSeen={isSeen}>
      <ChapterIsSeen onClick={() => setIsSeen(!isSeen)}>
        <FontAwesomeIcon icon={isSeen ? 'eye-slash' : 'eye'} />
      </ChapterIsSeen>
      <Link to={`/read/${dir}`} className="Chapter">
        {chapterTitle({ chapter, f })}
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
        >
          <FontAwesomeIcon icon="download" />
        </a>
      </div>
    </ChapterRow>
  );
}

export default memo(Chapter);
