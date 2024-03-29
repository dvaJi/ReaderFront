import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { getImage } from '../Image';
import Flag from '@components/Flag';

const Image = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const FlagWrapper = styled.div`
  position: absolute;
  right: 5%;
  top: 1%;
  z-index: 2;
`;

export default function Block({ blockId, blocks, blockStyle }) {
  const imageToDisplay = (index, chapter) => {
    if (blockId === 1) {
      return getImage(chapter.thumbnail_path, 334, 332, index, true);
    } else if (blockId === 2) {
      return getImage(chapter.thumbnail_path, 163, 320, index, true);
    } else if (blockId === 3 && index > 1) {
      return getImage(chapter.thumbnail_path, 215, 430, index, true);
    } else if (blockId === 5 && index <= 1) {
      return getImage(chapter.thumbnail_path, 184, 315, index, true);
    } else if (blockId === 5 && index > 1) {
      return getImage(chapter.thumbnail_path, 145, 210, index, true);
    } else {
      return getImage(chapter.thumbnail_path, 111, 212, index, true);
    }
  };

  return (
    <ul
      className={`comic-slide-list-block ${blockStyle} comic-slide-fr-slide`}
      aria-hidden="true"
      tabIndex="-1"
    >
      {blocks.map((chapter, index) => (
        <li key={index}>
          <FlagWrapper>
            <Flag language={chapter.language_name} />
          </FlagWrapper>
          <Link
            href="/read/[slug]/[lang]/[volume]/[chapter]"
            as={chapter.read_path}
            passHref
          >
            <Image
              image={imageToDisplay(index, chapter)}
              tabIndex="-1"
              className={chapter.work.adult ? 'is-adult' : ''}
              style={{
                backgroundImage: `url('${imageToDisplay(index, chapter)}')`
              }}
              alt={`${chapter.work.name} - Cap. ${chapter.chapter}.${chapter.subchapter}`}
            >
              <span>
                {chapter.work.name} - Cap. {chapter.chapter}
                {Number(chapter.subchapter) !== 0
                  ? '.' + chapter.subchapter
                  : ''}
              </span>
            </Image>
          </Link>
        </li>
      ))}
    </ul>
  );
}
