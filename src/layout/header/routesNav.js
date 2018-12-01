import {
  faBook,
  faThList,
  faRss,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faPatreon } from '@fortawesome/free-brands-svg-icons';
import * as config from '../../config';

export const PUBLIC_ROUTES = [
  {
    to: '/',
    msgId: 'home',
    msgDefault: 'Home',
    icon: faHome,
    show: true,
    exact: true,
    position: 1
  },
  {
    to: '/releases',
    msgId: 'releases',
    msgDefault: 'Releases',
    icon: faThList,
    show: true,
    position: 2
  },
  {
    to: '/work/all',
    msgId: 'projects',
    msgDefault: 'Projects',
    icon: faBook,
    show: true,
    position: 3
  },
  {
    to: '/blog',
    msgId: 'blog',
    msgDefault: 'Blog',
    icon: faRss,
    show: true,
    position: 4
  },
  {
    to: config.DISCORD_URL,
    msgId: 'discord',
    msgDefault: 'Discord',
    icon: faDiscord,
    show: config.DISCORD_URL,
    target: '_blank',
    rel: 'noopener',
    position: 5
  },
  {
    to: config.PATREON_URL,
    msgId: 'patreon',
    msgDefault: 'Patreon',
    icon: faPatreon,
    show: config.PATREON_URL,
    target: '_blank',
    rel: 'noopener',
    position: 6
  }
];

export const ADMIN_ROUTES = [
  {
    to: '/admincp/dashboard',
    msgId: 'dashboard',
    msgDefault: 'Dashboard',
    show: true,
    position: 1
  },
  {
    to: '/admincp/work',
    msgId: 'projects',
    msgDefault: 'Projects',
    show: true,
    position: 2
  },
  {
    to: '/admincp/blog',
    msgId: 'blog',
    msgDefault: 'Blog',
    show: true,
    position: 3
  }
];
