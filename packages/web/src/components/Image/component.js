import React, { forwardRef } from 'react';

import { IS_PROD, READER_PATH, S3_ENDPOINT } from 'lib/config';
import { getImage } from './load';

const Image = (
  {
    src,
    alt,
    height,
    width,
    crop = false,
    index = 1,
    tag: Tag = 'img',
    ...props
  },
  ref
) => {
  let baseUrl = READER_PATH;
  if (S3_ENDPOINT) {
    baseUrl = S3_ENDPOINT;
  }
  const href = baseUrl + (src || '/default-cover.png');
  const item = {
    href,
    height,
    width,
    crop
  };
  const finalUrl = IS_PROD || S3_ENDPOINT ? getImage(item, index) : href;
  return (
    <Tag src={finalUrl} alt={alt} {...useWidth(width)} ref={ref} {...props} />
  );
};

export default forwardRef(Image);

function useWidth(width) {
  if (width !== undefined && width !== null && width !== 0) {
    return { width };
  } else {
    return {};
  }
}
