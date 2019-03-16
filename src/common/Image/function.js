import { IS_PROD, READER_PATH } from '../../config';
import { getImage } from './load';

export default function Image(src, height, width, index = 1) {
  const href = IS_PROD ? READER_PATH + src : src;
  const item = {
    href,
    height,
    width
  };

  return !IS_PROD ? getImage(item, index) : href;
}
