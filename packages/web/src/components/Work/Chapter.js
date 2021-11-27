import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonDropdown } from 'reactstrap';
import styled from 'styled-components';

import useIntl from '@hooks/use-intl';

import { chapterTitle } from '@readerfront/shared/build/lang/chapter-title';
import { useChapterSeen } from '@hooks/useChapterSeen';
import { ANONYMIZER_DOWNLOADS } from 'lib/config';
import { logEvent } from 'lib/analytics';
import {
  ChapterNum,
  ChapterIsSeen,
  EndBadge,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ChapterTitle
} from './styles';

import { getImage } from '@components/Image';

const ChapterItemThumb = styled.img`
  height: auto;
  width: 100%;
  grid-column: 1;
  grid-row: 1/4;
  max-width: 180px;
  transition: all 0.2s;
  margin-left: 10px;
`;

const ChapterItem = styled.a`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 2fr;
  padding-right: 20px;
  cursor: pointer;

  ${props => (props.isSeen ? 'opacity: 0.5;' : '')}

  &:hover {
    background-color: hsla(0, 0%, 47.1%, 0.1);
    text-decoration: none;
  }
`;

const ChapterItemWrapper = styled.div`
  display: grid;
  grid-column: 1;
  grid-row: 1/3;
  grid-template-columns: minmax(80px, 205px) 1fr;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  grid-gap: 10px;
`;

const ChapterItemContainer = styled.div`
  align-items: center;
  justify-content: flex-end;
  display: absolute;
`;

const ChapterDownloadButton = styled.div`
  position: absolute;
  top: 40%;
  right: 2%;
`;

const ChapterLastUpdate = styled.p`
  font-weight: 700;
  color: #6c757d !important;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  position: relative;
  top: -10px;
`;

function Chapter({ chapter, work, isEnd, num }) {
  const [downloadDrop, setDownloadDrop] = useState(false);
  const { f } = useIntl();
  const { isSeen, setIsSeen } = useChapterSeen(chapter.id);

  const toggleDropdown = () => setDownloadDrop(!downloadDrop);

  const downloadHref = ANONYMIZER_DOWNLOADS + chapter.download_href;

  const url = getImage(chapter.thumbnail_path, 150, 320, 1, true);

  return (
    <div className="position-relative">
      <Link href={chapter.read_path} passHref>
        <ChapterItem isSeen={isSeen}>
          <ChapterItemWrapper>
            <ChapterItemThumb alt="thumbnail" src={url} lazy="loaded" />
            <ChapterNum>
              <span>#{chapter.chapter}</span>
              {isEnd && (
                <EndBadge
                  id="end_chapter"
                  className="badge badge-pill badge-secondary"
                >
                  {f({ id: 'end', defaultMessage: 'End' })}
                </EndBadge>
              )}
              <ChapterIsSeen onClick={() => setIsSeen(!isSeen)}>
                <FontAwesomeIcon icon={isSeen ? 'eye-slash' : 'eye'} />
              </ChapterIsSeen>
            </ChapterNum>
            <ChapterTitle>{chapterTitle({ chapter, f })}</ChapterTitle>
            <ChapterLastUpdate>{chapter.releaseDate}</ChapterLastUpdate>
          </ChapterItemWrapper>
          <ChapterItemContainer />
        </ChapterItem>
      </Link>
      <ChapterDownloadButton>
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
      </ChapterDownloadButton>
    </div>
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
