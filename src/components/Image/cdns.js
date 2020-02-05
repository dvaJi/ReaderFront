import { hashToNum } from '@shared/hash';
import { parseUri } from '@shared/parse-uri';
import { networkType } from '@shared/network-type';

export function google(item, index) {
  const ele = parseUri(item.href);
  return `https://images${hashToNum(
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
  const quality = item.quality || getLSQuality() || getQuality();
  const crop =
    item.crop && item.height
      ? `&crop=0px,0px,${item.width}px,${item.height}px`
      : '';
  return `https://i${hashToNum(ele.host, index, 0, 2)}.wp.com/${ele.authority +
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
      return 60;
    case 2: // Slow network
      return 40;
    default:
      return 100;
  }
}

function getLSQuality() {
  try {
    const coreSettings = JSON.parse(
      window.localStorage.getItem('coreSettings')
    );
    return coreSettings.qualityImage;
  } catch (err) {
    return null;
  }
}
