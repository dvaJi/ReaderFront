import { IS_PROD, READER_PATH } from '../../config';
import { getImage } from './load';

export default function Image(src, height, width, index = 1, crop = false) {
  const href = READER_PATH + src;
  const item = {
    href,
    height,
    width,
    crop
  };

  return IS_PROD ? getImage(item, index) : href;
}
