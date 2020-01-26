import { CDN } from 'lib/config';
import parseUri from 'utils/parseUri';
import { google, photon, staticaly } from './cdns';

const PRIVATE_IPS = /(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/;

export function getImage(item, index) {
  if (!isApplicableHost(item.href)) return item.href;
  switch (CDN) {
    case 'photon':
      return photon(item, index);
    case 'google':
      return google(item, index);
    case 'staticaly':
      return staticaly(item, index);
    default:
      return item.href;
  }
}

function isApplicableHost(href) {
  let applicable = true;
  const devhosts = [PRIVATE_IPS, /^localhost/, /\.local$/];
  devhosts.forEach(host => {
    if (parseUri(href).host.match(host)) {
      applicable = false;
    }
  });
  if (!/^(?:[a-z]+:)?\/\//i.test(href)) applicable = false;
  return applicable;
}
