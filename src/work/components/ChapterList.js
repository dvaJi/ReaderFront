import React from 'react';

import { FormattedMessage } from 'react-intl';
import Chapter from './Chapter';

import { ChapterListStyle, Title, List, NoChapters } from './styles';

function ChapterList({ work, language }) {
  return (
    <ChapterListStyle className="col-md-12">
      <Title>
        <FormattedMessage id="chapters_list" defaultMessage="Chapters" />
      </Title>
      {work.chapters.length > 0 ? (
        <List>
          {work.chapters.map(chapter => (
            <Chapter
              key={chapter.id}
              work={work}
              chapter={chapter}
              language={language}
            />
          ))}
        </List>
      ) : (
        <NoChapters>
          <FormattedMessage id="no_chapters" defaultMessage="No chapters" />
        </NoChapters>
      )}
    </ChapterListStyle>
  );
}

export default ChapterList;
