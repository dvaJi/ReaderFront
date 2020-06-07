import React from 'react';

import { useIntl } from 'react-intl';
import Chapter from './Chapter';

import { ChapterListStyle, Title, List, NoChapters } from './styles';

function ChapterList({ work }) {
  const { formatMessage: f } = useIntl();
  const workIsCompleted = work.status === 2;
  return (
    <ChapterListStyle className="col-md-12">
      <Title>{f({ id: 'chapters_list', defaultMessage: 'Chapters' })}</Title>
      {work.chapters.length > 0 ? (
        <List>
          {work.chapters.map(chapter => (
            <Chapter
              key={chapter.id}
              chapter={chapter}
              work={work}
              isEnd={workIsCompleted && chapter.id === work.chapters[0].id}
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
