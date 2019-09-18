import React from 'react';
import styled from 'styled-components';

import { useGlobalState } from 'state';
import LazyImage from '../../common/Image';

const ImageList = styled.div`
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
  max-width: none;
	max-height: none
  padding-left: 0;
  flex-direction: column;

  ${props =>
    props.pageRendering === 'longstrip'
      ? 'flex-direction: column;'
      : 'justify-content: center;'}

  ${props =>
    props.fitDisplay === 'noresize' &&
    `box-sizing: content-box;
    min-width: auto;`}

  ${props =>
    props.fitVertical &&
    `max-height: 100%;
    height: calc(100% - 15px);
  width: inherit;`}

  ${props => props.fitHorizontal && `max-width: 100%;`}

  ${props =>
    props.fitVertical &&
    props.pageRendering !== 'longstrip' &&
    `flex: 0 1 auto;`}

  ${props =>
    props.fitVertical && props.pageRendering === 'longstrip' && `height: 100%;`}
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
  max-width: none;
	max-height: none
  flex: 0 0 auto;
  display: block;
  height: auto !important;
  padding: 2px 0;

  ${props => props.fitVertical && `height: 100%;max-height: 100%;`}

  ${props => props.fitHorizontal && `max-width: 100%;`}

  ${props =>
    props.fitVertical &&
    props.pageRendering !== 'longstrip' &&
    `flex: 0 1 auto;`}

  ${props =>
    props.pageRendering === 'longstrip' &&
    `flex: 0 0 auto;
      display: block;
      height: auto!important;`}

  ${props =>
    props.fitVertical &&
    props.pageRendering === 'longstrip' &&
    `display: block;
	max-height: 100%!important;`}

  img {
    vertical-align: middle;
    border-style: none;
    cursor: pointer;
    user-select: none;
    user-drag: none;
    height: auto;
    width: auto;
    margin: auto;
    object-fit: scale-down;
    max-width: none;
    max-height: none

    ${props => props.fitVertical && `max-height: 100%;`}
    ${props => props.fitHorizontal && `max-width: 100%;`}

    ${props => props.pageRendering === 'single' && `margin: auto;`}
    ${props => props.pageRendering === 'double' && `max-width: 50%;`}

    ${props =>
      props.fitVertical &&
      props.pageRendering !== 'longstrip' &&
      `flex: 0 1 auto;`}
    
    ${props =>
      props.fitVertical &&
      props.pageRendering === 'longstrip' &&
      `object-fit: scale-down;
      max-height: -webkit-fill-available;`}
  }
`;

function ImagesList({ chapter, pages }) {
  const [displaySettings] = useGlobalState('displaySettings');
  const { fitDisplay, pageRendering } = displaySettings;
  window.scrollTo(0, 0);
  const thumbPath = `works/${chapter.work.uniqid}/${chapter.uniqid}/`;
  const fitVertical = fitDisplay === 'container' || fitDisplay === 'height';
  const fitHorizontal = fitDisplay === 'container' || fitDisplay === 'width';
  return (
    <ImageList
      fitVertical={fitVertical}
      fitHorizontal={fitHorizontal}
      pageRendering={pageRendering}
      fitDisplay={fitDisplay}
    >
      {pages.map(page => (
        <ImageWrapper
          key={page.filename}
          fitVertical={fitVertical}
          fitHorizontal={fitHorizontal}
          pageRendering={pageRendering}
          fitDisplay={fitDisplay}
        >
          <LazyImage
            src={thumbPath + page.filename}
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
export default ImagesList;
