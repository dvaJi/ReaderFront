import React, { useState } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonDropdown } from 'reactstrap';

import { chapterTitle } from '@shared/lang/chapter-title';
import { useChapterSeen } from '@hooks/useChapterSeen';
import { ANONYMIZER_DOWNLOADS } from 'lib/config';
import { logEvent } from 'lib/analytics';
import {
  ChapterRow,
  ChapterIsSeen,
  EndBadge,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from './styles';

function Chapter({ chapter, work, isEnd }) {
  const [downloadDrop, setDownloadDrop] = useState(false);
  const { formatMessage: f } = useIntl();
  const { isSeen, setIsSeen } = useChapterSeen(chapter.id);

  const toggleDropdown = () => setDownloadDrop(!downloadDrop);

  const downloadHref = ANONYMIZER_DOWNLOADS + chapter.download_href;

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
        <ButtonDropdown
          direction="left"
          isOpen={downloadDrop}
          toggle={toggleDropdown}
        >
          <DropdownToggle size="sm">
            <FontAwesomeIcon icon="download" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <DownloadLink
                href={downloadHref}
                type="pdf"
                icon="file-pdf"
                work={work}
                chapter={chapter}
                f={f}
              />
            </DropdownItem>
            <DropdownItem>
              <DownloadLink
                href={downloadHref}
                type="zip"
                icon="file-archive"
                work={work}
                chapter={chapter}
                f={f}
              />
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    </ChapterRow>
  );
}

const DownloadLink = ({ href, work, chapter, f, type, icon }) => (
  <a
    className="Download"
    href={`${href}/${type}`}
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
        `${work.name} [${work.language_name}] - ${chapter.chapter}.${chapter.subchapter} ${type}`
      );
    }}
  >
    <FontAwesomeIcon icon={icon} /> {type.toUpperCase()}
  </a>
);

export default Chapter;
