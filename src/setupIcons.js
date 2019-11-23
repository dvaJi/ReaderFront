import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faCog,
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faFlag,
  faWindowMaximize,
  faDownload,
  faComments,
  faEye,
  faEyeSlash,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

function setupIcons() {
  library.add(
    faCog,
    faAngleLeft,
    faAngleRight,
    faArrowLeft,
    faFlag,
    faWindowMaximize,
    faDownload,
    faComments,
    faEye,
    faEyeSlash,
    faTimes
  );
}

export default setupIcons;
