import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { READER_PATH, ANONYMIZER_DOWNLOADS } from '../../config';
import { ChapterRow } from './styles';

function Chapter({ work, chapter, language, intl }) {
  const dir = `${work.stub}/${language.name}/${chapter.volume}/${chapter.chapter}.${chapter.subchapter}`;
  return (
    <ChapterRow className="clearfix">
      <Link to={`/read/${dir}`} className="Chapter">
        <FormattedMessage id="chapter" defaultMessage="Chapter" />{' '}
        {chapter.chapter}
        {chapter.subchapter !== 0 ? '.' + chapter.subchapter : ''}
        {chapter.name !== '' ? `: ${chapter.name}` : ''}
      </Link>
      <div className="float-right">
        <a
          className="Download"
          href={`${ANONYMIZER_DOWNLOADS + READER_PATH}download/${chapter.id}`}
          target="_blank"
          rel="noopener noreferrer"
          title={intl.formatMessage({
            id: 'download_chapter',
            defaultMessage: 'Download chapter'
          })}
        >
          <FontAwesomeIcon icon={faDownload} />
        </a>
      </div>
    </ChapterRow>
  );
}

export default memo(injectIntl(Chapter));
