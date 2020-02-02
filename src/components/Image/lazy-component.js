import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import { IS_PROD, READER_PATH } from 'lib/config';
import { getImage } from './load';
const IS_PROD = true,
  READER_PATH = 'https://api.ravens-scans.com';
export default function Image({
  src,
  alt,
  height,
  width,
  crop = false,
  index = 1,
  ...props
}) {
  const href = READER_PATH + (src || '/default-cover.png');
  const item = {
    href,
    height,
    width,
    crop
  };
  const finalUrl = IS_PROD ? getImage(item, index) : href;

  const lowResItem = {
    ...item,
    height: height > 0 ? Math.round(height / 5) : height,
    width: width > 0 ? Math.round(width / 5) : width,
    quality: 10
  };
  const lowResUrl = IS_PROD ? getImage(lowResItem, index) : href;
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
