/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { UncontrolledTooltip } from 'reactstrap';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';

import { APP_TITLE, ANONYMIZER_DOWNLOADS } from 'lib/config';
import { useChapterSeen } from '@hooks/useChapterSeen';
import { chapterTitle, chapterUrl } from 'utils/common';
import {
  ReaderControlsContainer,
  ReaderControlsWrapper,
  ReaderControlsInfo,
  ReaderControlsActions,
  ReaderControlsLogo,
  ReaderControlsChapterInfo,
  ReaderControlsWork,
  ReaderControlsChapters
} from './styles';
import ReaderSettings from './ReaderSettings';

export const FETCH_CHAPTERS = gql`
  query ChaptersByWork($language: Int, $workStub: String) {
    chaptersByWork(language: $language, workStub: $workStub) {
      id
      chapter
      subchapter
      volume
      language
      name
      stub
      uniqid
    }
  }
`;

export function ReaderControls({
  work,
  language,
  chapter,
  toggleComments,
  showNav
}) {
  const { formatMessage: f } = useIntl();
  const [showSettings, toggleShowSettings] = useState(false);
  const { setIsSeen } = useChapterSeen(chapter.id);

  useEffect(() => {
    setIsSeen(true);
  }, [chapter]);

  return (
    <div
      style={{
        opacity: showNav ? 1 : 0,
        visibility: showNav ? 'visible' : 'hidden'
      }}
    >
      <ReaderControlsContainer>
        <ReaderControlsWrapper>
          <ReaderControlsInfo>
            <ReaderControlsLogo>
              <Link href="/">
                <a>{APP_TITLE}</a>
              </Link>
            </ReaderControlsLogo>
            <ReaderControlsChapterInfo>
              <Link href="/work/[slug]" as={`/work/${work.stub}`}>
                <ReaderControlsWork title={work.name}>
                  {work.name}
                </ReaderControlsWork>
              </Link>
              <ReaderControlsChapters>
                <ChaptersSelects
                  workStub={work.stub}
                  language={language}
                  chapter={chapter}
                  work={work}
                />
              </ReaderControlsChapters>
            </ReaderControlsChapterInfo>
          </ReaderControlsInfo>
          <ReaderControlsActions>
            <button
              title="Show Comments"
              id="show-comments"
              onClick={() => toggleComments(true)}
            >
              <FontAwesomeIcon icon="comments" size="lg" />
            </button>
            <UncontrolledTooltip placement="bottom" target="show-comments">
              {f({
                id: 'show_comments',
                defaultMessage: 'Show Comments'
              })}
            </UncontrolledTooltip>
            <a
              title="Download chapter"
              id="download-chapter"
              href={`${ANONYMIZER_DOWNLOADS + chapter.download_href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon="download" size="lg" />
            </a>
            <UncontrolledTooltip placement="bottom" target="download-chapter">
              {f({
                id: 'download_chapter',
                defaultMessage: 'Download Chapter'
              })}
            </UncontrolledTooltip>
            <button
              title="Reader settings"
              id="settings-button"
              onClick={() => toggleShowSettings(!showSettings)}
            >
              <FontAwesomeIcon icon="cog" size="lg" />
            </button>
            <UncontrolledTooltip placement="bottom" target="settings-button">
              {f({ id: 'reader_settings', defaultMessage: 'Reader Settings' })}
            </UncontrolledTooltip>
            <ReaderSettings isOpen={showSettings} toggle={toggleShowSettings} />
          </ReaderControlsActions>
        </ReaderControlsWrapper>
      </ReaderControlsContainer>
      {/* <ReaderControlsPagination>
        <select>
          {chapter.pages.map((page, index) => (
            <option key={page.filename} value={index}>
              Page {index + 1} / {chapter.pages.length}
            </option>
          ))}
        </select>
      </ReaderControlsPagination> */}
    </div>
  );
}

const ChaptersSelects = ({ workStub, language, chapter, work }) => {
  const { formatMessage: f } = useIntl();
  const router = useRouter();

  const { loading, error, data } = useQuery(FETCH_CHAPTERS, {
    variables: { workStub, language }
  });

  if (loading || error) return null;
  return (
    <select
      id="jump-chapter"
      name="jump-chapter"
      defaultValue={chapter.id}
      onChange={e => {
        const selCh = data.chaptersByWork.find(
          ch => ch.id === Number(e.target.value)
        );
        router.push(chapterUrl(selCh, work));
      }}
    >
      {data.chaptersByWork.map(ch => (
        <option value={ch.id} key={`select-${ch.id}`}>
          {chapterTitle({ chapter: ch, f })}
        </option>
      ))}
    </select>
  );
};

export default ReaderControls;
