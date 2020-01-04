import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faBook,
  faCog,
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faArrowRight,
  faFlag,
  faWindowMaximize,
  faDatabase,
  faDownload,
  faComments,
  faHome,
  faMoon,
  faEye,
  faEyeSlash,
  faExclamationCircle,
  faTasks,
  faTimes,
  faThList,
  faPen,
  faPlus,
  faRss,
  faSave,
  faSun
} from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faPatreon } from '@fortawesome/free-brands-svg-icons';

function setupIcons() {
  library.add(
    faBook,
    faCog,
    faAngleLeft,
    faAngleRight,
    faArrowLeft,
    faArrowRight,
    faFlag,
    faWindowMaximize,
    faDatabase,
    faDownload,
    faComments,
    faHome,
    faMoon,
    faEye,
    faEyeSlash,
    faExclamationCircle,
    faTasks,
    faTimes,
    faThList,
    faPen,
    faPlus,
    faRss,
    faSave,
    faSun
  );
  library.add(faDiscord, faPatreon);
}

export default setupIcons;
