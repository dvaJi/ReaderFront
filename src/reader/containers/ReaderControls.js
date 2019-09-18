import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { chapterTitle, chapterUrl } from 'utils/common';
import { FETCH_CHAPTERS } from './queries';
import {
  ReaderControlsContainer,
  ReaderControlsWrapper,
  ReaderControlsCol,
  ReaderControlsTitle,
  ReaderControlsChapters,
  ReaderControlsActions
} from '../components/styles';
import { Button } from 'common/ui';
import ReaderSettings from '../components/ReaderSettings';

function ReaderControls({ work, language, chapter, intl }) {
  const [showSettings, toggleShowSettings] = useState(false);
  let workUrl = `/work/${work.stub}`;
  return (
    <ReaderControlsContainer>
      <ReaderControlsWrapper>
        <ReaderControlsCol>
          <ReaderControlsTitle>
            <div>
              <Link to={workUrl}>{work.name}</Link>
            </div>
          </ReaderControlsTitle>
          <ReaderControlsChapters>
            <ChaptersSelects
              workStub={work.stub}
              language={language}
              chapter={chapter}
              work={work}
              intl={intl}
            />
          </ReaderControlsChapters>
          <ReaderControlsActions>
            <div className="col row no-gutters">
              <Button
                title="Reader settings"
                id="settings-button"
                onClick={() => toggleShowSettings(!showSettings)}
              >
                <FontAwesomeIcon icon="cog" />
              </Button>
              <Button title="Hide header" id="hide-header-button">
                <FontAwesomeIcon icon="window-maximize" />
              </Button>
              <Button
                title="Report"
                data-toggle="modal"
                data-target="#modal-report"
              >
                <FontAwesomeIcon icon="flag" />
              </Button>
            </div>
          </ReaderControlsActions>
          <ReaderSettings isOpen={showSettings} toggle={toggleShowSettings} />
        </ReaderControlsCol>
      </ReaderControlsWrapper>
    </ReaderControlsContainer>
  );
}

const ChaptersSelects = ({ workStub, language, chapter, work, intl }) => (
  <Query query={FETCH_CHAPTERS} variables={{ workStub, language }}>
    {({ loading, error, data }) => {
      if (loading || error) return 'loading...';
      const chIndex = data.chaptersByWork.indexOf(
        data.chaptersByWork.find(c => c.id === chapter.id)
      );
      const nextChapter = data.chaptersByWork[chIndex - 1] || null;
      const prevChapter = data.chaptersByWork[chIndex + 1] || null;
      const nextChapterO = {
        url: nextChapter ? chapterUrl(nextChapter, work) : `/work/${work.stub}`,
        title: nextChapter
          ? chapterTitle({
              chapter: nextChapter,
              intl
            })
          : work.name
      };
      const prevChapterO = {
        url: prevChapter ? chapterUrl(prevChapter, work) : `/work/${work.stub}`,
        title: prevChapter
          ? chapterTitle({
              chapter: prevChapter,
              intl
            })
          : work.name
      };
      return (
        <>
          <Link
            className="chapter-link"
            title={prevChapterO.title}
            to={prevChapterO.url}
          >
            <FontAwesomeIcon icon="angle-left" />
          </Link>
          <div className="col py-2">
            <select
              className="form-control col"
              id="jump-chapter"
              name="jump-chapter"
              defaultValue={chapter.id}
            >
              {data.chaptersByWork.map(ch => (
                <option value={ch.id} key={`select-${ch.id}`}>
                  {chapterTitle({ chapter: ch, intl })}
                </option>
              ))}
            </select>
          </div>
          <Link
            className="chapter-link"
            title={nextChapterO.title}
            to={nextChapterO.url}
          >
            <FontAwesomeIcon icon="angle-right" />
          </Link>
          <div className="col-auto py-2 pr-2 d-lg-none">
            <select className="form-control" id="jump-page" name="jump-page">
              {chapter.pages.map((page, index) => (
                <option value={index} key={`select-${page.filename}`}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </>
      );
    }}
  </Query>
);

export default injectIntl(ReaderControls);
