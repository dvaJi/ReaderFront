import React, { memo } from 'react';
import styled from 'styled-components';

import { useGlobalState } from 'lib/state';
import { LazyImage } from '../Image';

const ImageList = styled.div`
  background-color: #212121;
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-wrap: nowrap !important;
  margin: auto !important;
  text-align: center !important;
  cursor: pointer;
  min-height: auto;
  width: auto;
  width: -webkit-fill-available;
  min-width: 100%;
  max-width: 100%;
	max-height: none
  padding-left: 0;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  flex-wrap: wrap;
  margin-right: 0;
  margin-left: 0;
  position: relative;
  min-height: 1px;
  width: auto;
  justify-content: center !important;
  align-items: center !important;
  margin-top: auto !important;
  margin-bottom: auto !important;
  user-select: none;
  user-drag: none;
  max-width: 100%;
	max-height: none
  flex: 0 0 auto;
  display: block;
  height: auto !important;

  ${props => props.readingMode === 'manga' && 'padding-bottom: 10px;'}

  span,
  img {
    vertical-align: middle;
    border-style: none;
    cursor: pointer;
    user-select: none;
    user-drag: none;
    height: auto;
    width: auto !important;
    margin: auto;
    object-fit: scale-down;
    max-width: 100%;
    max-height: none;
  }
`;

function ImagesList({ chapter, pages }) {
  const [displaySettings] = useGlobalState('displaySettings');
  const { readingMode } = displaySettings;
  const thumbPath = filename =>
    `/works/${chapter.work.uniqid}/${chapter.uniqid}/${filename}`;
  return (
    <ImageList>
      {pages.map(page => (
        <ImageWrapper
          key={`${page.filename}-${page.id}`}
          readingMode={readingMode}
        >
          <LazyImage
            src={thumbPath(page.filename)}
            key={page.filename}
            height={page.height}
            width={page.width}
            index={page.id}
            alt={page.filename}
            title={page.filename}
          />
        </ImageWrapper>
      ))}
    </ImageList>
  );
}
export default memo(ImagesList);
