import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { READER_PATH, ANONYMIZER_DOWNLOADS } from '../../config';

export const ChapterLi = styled.div`
  list-style-type: none;
  background-color: #fff;
  line-height: 1.5rem;
  padding: 10px 20px;
  margin: 0;
  border-bottom: 1px solid #e0e0e0;
`;

function Chapter({ work, chapter, language, intl }) {
  const dir = `${work.stub}/${language.name}/${chapter.volume}/${
    chapter.chapter
  }.${chapter.subchapter}`;
  return (
    <ChapterLi className="clearfix">
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
    </ChapterLi>
  );
}

export default memo(injectIntl(Chapter));
