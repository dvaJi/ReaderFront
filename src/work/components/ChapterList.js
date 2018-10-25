import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import Chapter from './Chapter';

export const ChapterListStyle = styled.div`
  text-align: left;
  margin: 3rem 0 1rem 0;
`;

export const List = styled.div`
  text-align: left;
  margin: 0.5rem 0 1rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  padding-left: 0;
  list-style-type: none;
`;

const Title = styled.h2`
  margin-left: 10px;
`;

class ChapterList extends PureComponent {
  render() {
    const { work, language } = this.props;
    return (
      <ChapterListStyle className="col-md-12">
        <Title>
          <FormattedMessage id="chapters_list" defaultMessage="Chapters" />
        </Title>
        <List>
          {work.chapters
            .filter(c => c.language === language.id)
            .sort((a, b) => b.chapter - a.chapter)
            .map(chapter => (
              <Chapter
                key={chapter.id}
                work={work}
                chapter={chapter}
                language={language}
              />
            ))}
        </List>
      </ChapterListStyle>
    );
  }
}

export default injectIntl(ChapterList);
