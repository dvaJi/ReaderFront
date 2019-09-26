import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { UncontrolledTooltip } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_TITLE, ANONYMIZER_DOWNLOADS, READER_PATH } from '../../config';
import { chapterTitle, chapterUrl } from 'utils/common';
import { FETCH_CHAPTERS } from './queries';
import {
  ReaderControlsContainer,
  ReaderControlsWrapper,
  ReaderControlsInfo,
  ReaderControlsActions,
  ReaderControlsLogo,
  ReaderControlsChapterInfo,
  ReaderControlsWork,
  ReaderControlsChapters
} from '../components/styles';
import ReaderSettings from '../components/ReaderSettings';

function ReaderControls({
  work,
  language,
  chapter,
  toggleComments,
  intl,
  history,
  showNav
}) {
  const [showSettings, toggleShowSettings] = useState(false);
  const workUrl = `/work/${work.stub}`;
  const chapterDownload = `${ANONYMIZER_DOWNLOADS + READER_PATH}download/${
    chapter.id
  }`;
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
              <Link to="/">{APP_TITLE}</Link>
            </ReaderControlsLogo>
            <ReaderControlsChapterInfo>
              <ReaderControlsWork to={workUrl} title={work.name}>
                {work.name}
              </ReaderControlsWork>
              <ReaderControlsChapters>
                <ChaptersSelects
                  workStub={work.stub}
                  language={language}
                  chapter={chapter}
                  work={work}
                  intl={intl}
                  history={history}
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
              Show Comments
            </UncontrolledTooltip>
            <a
              title="Download chapter"
              id="download-chapter"
              href={chapterDownload}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon="download" size="lg" />
            </a>
            <UncontrolledTooltip placement="bottom" target="download-chapter">
              Download Chapter
            </UncontrolledTooltip>
            <button
              title="Reader settings"
              id="settings-button"
              onClick={() => toggleShowSettings(!showSettings)}
            >
              <FontAwesomeIcon icon="cog" size="lg" />
            </button>
            <UncontrolledTooltip placement="bottom" target="settings-button">
              Reader Settings
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

const ChaptersSelects = ({
  workStub,
  language,
  chapter,
  work,
  intl,
  history
}) => (
  <Query query={FETCH_CHAPTERS} variables={{ workStub, language }}>
    {({ loading, error, data }) => {
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
            history.push(chapterUrl(selCh, work));
          }}
        >
          {data.chaptersByWork.map(ch => (
            <option value={ch.id} key={`select-${ch.id}`}>
              {chapterTitle({ chapter: ch, intl })}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);

export default injectIntl(ReaderControls);
