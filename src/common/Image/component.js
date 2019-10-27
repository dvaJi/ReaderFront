import React, { forwardRef } from 'react';

import { IS_PROD, READER_PATH } from '../../config';
import { getImage } from './load';

const Image = forwardRef(
  (
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
    const href = READER_PATH + (src || 'images/default-cover.png');
    const item = {
      href,
      height,
      width,
      crop
    };
    const finalUrl = IS_PROD ? getImage(item, index) : href;
    return (
      <Tag src={finalUrl} alt={alt} {...useWidth(width)} ref={ref} {...props} />
    );
  }
);

export default Image;

function useWidth(width) {
  if (width !== undefined && width !== null && width !== 0) {
    return { width };
  } else {
    return {};
  }
}
