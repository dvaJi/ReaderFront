import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { IS_PROD, READER_PATH, S3_ENDPOINT } from '../../lib/config';
import { getImage } from './load';

export default function Image({
  src,
  alt,
  height,
  width,
  crop = false,
  index = 1,
  ...props
}) {
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

  const lowResItem = {
    ...item,
    height: height > 0 ? Math.round(height / 5) : height,
    width: width > 0 ? Math.round(width / 5) : width,
    quality: 10
  };
  const lowResUrl = IS_PROD || S3_ENDPOINT ? getImage(lowResItem, index) : href;
  return (
    <LazyLoadImage
      src={finalUrl}
      alt={alt}
      height={height}
      width={width}
      key={finalUrl}
      placeholderSrc={lowResUrl}
      effect="blur"
      {...props}
    />
  );
}
