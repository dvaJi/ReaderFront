import parseUri from '../../utils/parseUri';
import { networkType, hash } from '../../utils/helpers';

export function google(item, index) {
  const ele = parseUri(item.href);
  return `https://images${hash(
    ele.host,
    index,
    0,
    2
  )}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1${
    item.width ? '&resize_w=' + item.width : ''
  }&rewriteMime=image/*&url=${encodeURIComponent(item.href)}`;
}

export function photon(item, index) {
  const ele = parseUri(item.href);
  const quality = getQuality();
  const crop =
    item.crop && item.height
      ? `&crop=0px,0px,${item.width}px,${item.height}px`
      : '';
  return `https://i${hash(ele.host, index, 0, 2)}.wp.com/${ele.authority +
    ele.path}?strip=all&quality=${quality}${
    item.width ? '&w=' + item.width : ''
  }${crop}`;
}

export function staticaly(item) {
  const ele = parseUri(item.href);
  return `https://cdn.staticaly.com/img/${ele.authority + ele.path}${
    item.width ? '?w=' + item.width : ''
  }`;
}

function getQuality() {
  switch (networkType()) {
    case 1: // Medium network
      return 90;
    case 2: // Slow network
      return 85;
    default:
      return 95;
  }
}
