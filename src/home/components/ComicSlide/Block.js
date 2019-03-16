import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getImage } from '../../../common/Image';
import { languageIdToName } from '../../../utils/common';

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
    const thumbPath =
      chapter.thumbnail !== ''
        ? `works/${chapter.work.uniqid}/${chapter.uniqid}/${chapter.thumbnail}`
        : '/static/images/default-cover.png';
    if (blockId <= 2) {
      return getImage(thumbPath, 335, 335);
    } else if (blockId === 3 && index > 1) {
      return getImage(thumbPath, 430, 430);
    } else if (blockId === 5 && index <= 1) {
      return getImage(thumbPath, 315, 315);
    } else {
      return getImage(thumbPath, 212, 212);
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
              className={chapter.work.adult ? 'is-adult' : ''}
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
