import React from 'react';

import { useIntl } from 'react-intl';
import Chapter from './Chapter';

import { ChapterListStyle, Title, List, NoChapters } from './styles';

function padZero(num) {
  return String(num).padStart(3, '0');
}

function ChapterList({ work }) {
  const { formatMessage: f } = useIntl();
  const workIsCompleted = work.status_name === 'completed';

  if (work.licensed) {
    return (
      <ChapterListStyle className="col-md-12">
        <NoChapters>
          {f({
            id: 'license_no_chapters',
            defaultMessage: 'Chapters were removed due this work got licensed.'
          })}
        </NoChapters>
      </ChapterListStyle>
    );
  }

  return (
    <ChapterListStyle className="col-md-12">
      <Title>{f({ id: 'chapters_list', defaultMessage: 'Chapters' })}</Title>
      {work.chapters.length > 0 ? (
        <List>
          {work.chapters.map((chapter, index) => (
            <Chapter
              key={chapter.id}
              chapter={chapter}
              work={work}
              isEnd={
                workIsCompleted &&
                chapter.read_path === work.chapters[0].read_path
              }
              // num={padZero(index + 1)}
            />
          ))}
        </List>
      ) : (
        <NoChapters>
          {f({ id: 'no_chapters', defaultMessage: 'No chapters' })}
        </NoChapters>
      )}
    </ChapterListStyle>
  );
}

export default ChapterList;
