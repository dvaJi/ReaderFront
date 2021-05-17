import { IS_PROD, READER_PATH, S3_ENDPOINT } from '../../config';
import { getImage } from './load';

export default function Image(src, height, width, index = 1, crop = false) {
  let baseUrl = READER_PATH;
  if (S3_ENDPOINT) {
    baseUrl = S3_ENDPOINT;
  }

  const href = baseUrl + src;
  const item = {
    href,
    height,
    width,
    crop
  };
  return IS_PROD || S3_ENDPOINT ? getImage(item, index) : href;
}
