/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useIntl } from 'react-intl';
import gql from 'graphql-tag';

import { APP_TITLE } from 'lib/config';
import { useChapterSeen } from '@hooks/useChapterSeen';
import { chapterTitle } from '@readerfront/shared/build/lang/chapter-title';
import {
  ReaderControlsContainer,
  ReaderControlsWrapper,
  ReaderControlsInfo,
  ReaderControlsLogo,
  ReaderControlsChapterInfo,
  ReaderControlsWork,
  ReaderControlsChapters
} from './styles';
import ReaderSettings from './ReaderSettings';
import { memo } from 'react';

const ReaderControlsActions = dynamic(() => import('./ReaderControlsActions'));

export const FETCH_CHAPTERS = gql`
  query ChaptersByWork($languages: [Int], $workStub: String) {
    chaptersByWork(languages: $languages, workStub: $workStub) {
      id
      chapter
      subchapter
      volume
      language
      name
      stub
      uniqid
      read_path
    }
  }
`;

export function ReaderControls({ work, language, chapter, showNav }) {
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
              <Link
                href="/work/[lang]/[slug]"
                as={`/work/${work.language_name}/${work.stub}`}
                passHref
              >
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
          <ReaderControlsActions
            work={work}
            chapter={chapter}
            toggleShowSettings={toggleShowSettings}
          >
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

const ChaptersSelects = memo(({ workStub, language, chapter, work }) => {
  const { formatMessage: f } = useIntl();
  const router = useRouter();

  const { loading, error, data } = useQuery(FETCH_CHAPTERS, {
    variables: { workStub, languages: [language] }
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
        router.push(selCh.read_path);
      }}
    >
      {data.chaptersByWork.map(ch => (
        <option value={ch.id} key={`select-${ch.id}`}>
          {chapterTitle({ chapter: ch, f })}
        </option>
      ))}
    </select>
  );
});

export default ReaderControls;
