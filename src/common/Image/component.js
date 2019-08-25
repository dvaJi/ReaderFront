import React from 'react';

import { IS_PROD, READER_PATH } from '../../config';
import { getImage } from './load';

export default function Image({
  src,
  alt,
  height,
  width,
  crop = false,
  index = 1,
  tag: Tag = 'img',
  ...props
}) {
  const href = READER_PATH + (src || 'images/default-cover.png');
  const item = {
    href,
    height,
    width,
    crop
  };
  const finalUrl = IS_PROD ? getImage(item, index) : href;
  return <Tag src={finalUrl} alt={alt} {...useWidth(width)} {...props} />;
}

function useWidth(width) {
  if (width !== undefined && width !== null && width !== 0) {
    return { width };
  } else {
    return {};
  }
}
