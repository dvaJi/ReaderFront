import React, { memo } from 'react';
import styled from 'styled-components';
import Lazyload from 'react-lazyload';
import { getChapterPageUrl } from '../../utils/common';

const ImageList = styled.div`
  text-align: center;
  min-height: 1000px;
`;
const Image = styled.img`
  display: block;
  vertical-align: middle;
  margin: 0% auto;
  max-width: 100%;
  margin-bottom: 10px;
`;

function ImagesList({ chapter, pages }) {
  window.scrollTo(0, 0);
  return (
    <ImageList>
      {pages.map(page => (
        <Lazyload key={page.id} height={page.height} once>
          <Image
            src={getChapterPageUrl(
              chapter.work,
              chapter,
              page.filename,
              'original'
            )}
            alt={page.filename}
            title={page.filename}
          />
        </Lazyload>
      ))}
    </ImageList>
  );
}
export default memo(ImagesList);
