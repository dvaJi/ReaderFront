import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getChapterPageUrl, languageIdToName } from '../../../utils/common';

const Image = styled(Link)`
  background-image: url('${props => props.image}');
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export default class Block extends PureComponent {
  chapterUrl(block) {
    return `read/${block.work.stub}/${languageIdToName(block.language)}/${
      block.volume
    }/${block.chapter}.${block.subchapter}`;
  }

  imageToDisplay(blockId, index, chapter) {
    if (blockId <= 2 || (blockId === 3 && index > 1)) {
      return getChapterPageUrl(
        chapter.work,
        chapter,
        chapter.thumbnail,
        'medium'
      );
    } else if (blockId === 5 && index <= 1) {
      return getChapterPageUrl(
        chapter.work,
        chapter,
        chapter.thumbnail,
        'medium'
      );
    } else {
      return getChapterPageUrl(chapter.work, chapter, chapter.thumbnail);
    }
  }

  render() {
    return (
      <ul
        className={`comic-slide-list-block ${
          this.props.blockStyle
        } comic-slide-fr-slide`}
        aria-hidden="true"
        tabIndex="-1"
      >
        {this.props.blocks.map((chapter, index) => (
          <li key={index}>
            <Image
              to={this.chapterUrl(chapter)}
              image={this.imageToDisplay(this.props.blockId, index, chapter)}
              tabIndex="-1"
            >
              <span>
                {chapter.work.name} - Cap. {chapter.chapter}
                {Number(chapter.subchapter) !== 0
                  ? '.' + chapter.subchapter
                  : ''}
              </span>
            </Image>
          </li>
        ))}
      </ul>
    );
  }
}
