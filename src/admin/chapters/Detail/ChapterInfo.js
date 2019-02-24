import React, { memo } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

function ChapterInfo({ lang, chapter }) {
  const chapterPath = `/read/${chapter.work.stub}/${lang}/${chapter.volume}/${
    chapter.chapter
  }.${chapter.subchapter}`;
  return (
    <div className="my-3 p-3 bg-white rounded shadow-sm">
      <h5 className="pb-2 mb-0">
        <FormattedMessage id="volume" defaultMessage="Volume" />{' '}
        {chapter.volume}{' '}
        <FormattedMessage id="chapter" defaultMessage="Chapter" />{' '}
        {chapter.chapter}.{chapter.subchapter}: {chapter.name}
        <span className="badge badge-secondary ml-1">
          <FormattedMessage id={lang + '_full'} defaultMessage={lang} />
        </span>
        {chapter.hidden && (
          <span className="badge badge-danger ml-1">
            <FormattedMessage id={'hidden'} defaultMessage={'Hidden'} />
          </span>
        )}
        <Button
          tag={Link}
          to={chapterPath}
          color="primary"
          className="float-right"
          size="sm"
        >
          <FormattedMessage id="read_chapter" defaultMessage="Read chapter" />
        </Button>
      </h5>
    </div>
  );
}

export default memo(ChapterInfo);
