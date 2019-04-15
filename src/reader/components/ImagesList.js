import React, { memo } from 'react';
import styled from 'styled-components';
import Lazyload from 'react-lazyload';

import ImageOp from '../../common/Image';

const ImageList = styled.div`
  text-align: center;
  min-height: 1000px;
`;
const Image = styled(ImageOp)`
  display: block;
  vertical-align: middle;
  margin: 0% auto;
  max-width: 100%;
  margin-bottom: 10px;
`;

const getHeight = h => (h > 0 ? h : 800);

function ImagesList({ chapter, pages }) {
  window.scrollTo(0, 0);
  const thumbPath = `works/${chapter.work.uniqid}/${chapter.uniqid}/`;
  return (
    <ImageList>
      {pages.map(page => (
        <Lazyload
          key={page.id}
          height={getHeight(page.height)}
          placeholder={
            <div
              style={{
                display: 'block',
                width: 10,
                height: getHeight(page.height)
              }}
            >
              {' '}
            </div>
          }
          once
        >
          <Image
            src={thumbPath + page.filename}
            height={page.height}
            width={page.width}
            index={page.id}
            alt={page.filename}
            title={page.filename}
          />
        </Lazyload>
      ))}
    </ImageList>
  );
}
export default memo(ImagesList);
