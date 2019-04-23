import React from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
import Chapter from './Chapter';

import { ChapterListStyle, Title, List } from './styles';

function ChapterList({ work, language }) {
  return (
    <ChapterListStyle className="col-md-12">
      <Title>
        <FormattedMessage id="chapters_list" defaultMessage="Chapters" />
      </Title>
      <List>
        {work.chapters
          .sort((a, b) => b.chapter - a.chapter)
          .map(chapter => (
            <div>
              <Chapter
                key={chapter.id}
                work={work}
                chapter={chapter}
                language={language}
              />
            </div>
          ))}
      </List>
    </ChapterListStyle>
  );
}

export default injectIntl(ChapterList);
