import React, { memo } from 'react';
import styled from 'styled-components';

import { LazyImage } from '../../common/Image';

const ImageList = styled.div`
  text-align: center;
  min-height: 1000px;
`;
const Image = styled(LazyImage)`
  display: block;
  vertical-align: middle;
  margin: 0% auto;
  max-width: 100%;
  margin-bottom: 10px;
`;

function ImagesList({ chapter, pages }) {
  window.scrollTo(0, 0);
  const thumbPath = `works/${chapter.work.uniqid}/${chapter.uniqid}/`;
  return (
    <ImageList>
      {pages.map(page => (
        <Image
          src={thumbPath + page.filename}
          key={page.filename}
          height={page.height}
          width={page.width}
          index={page.id}
          alt={page.filename}
          title={page.filename}
        />
      ))}
    </ImageList>
  );
}
export default memo(ImagesList);
