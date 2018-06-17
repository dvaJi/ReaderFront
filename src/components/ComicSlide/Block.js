import React, { PureComponent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Image = styled(Link)`
  background-image: url('${props => props.image}');
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export default class Block extends PureComponent {
  chapterUrl(block) {
    const { chapter, comic } = block;
    return `read/${comic.stub}/${chapter.language}/${chapter.volume}/${
      chapter.chapter
    }.${chapter.subchapter}`;
  }

  imageToDisplay(blockId, index, chapter) {
    if (blockId <= 2 || (blockId === 3 && index > 1)) {
      return chapter.thumbnail3;
    } else if (blockId === 5 && index <= 1) {
      return chapter.thumbnail2;
    } else {
      return chapter.thumbnail;
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
              image={this.imageToDisplay(
                this.props.blockId,
                index,
                chapter.chapter
              )}
              tabIndex="-1"
            >
              <span>
                {chapter.comic.name} - Cap. {chapter.chapter.chapter}
                {Number(chapter.chapter.subchapter) !== 0
                  ? "." + chapter.chapter.subchapter
                  : ""}
              </span>
            </Image>
          </li>
        ))}
      </ul>
    );
  }
}
