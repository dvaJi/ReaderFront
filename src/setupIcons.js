import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faCog,
  faAngleLeft,
  faAngleRight,
  faFlag,
  faWindowMaximize,
  faDownload,
  faComments,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

function setupIcons() {
  library.add(
    faCog,
    faAngleLeft,
    faAngleRight,
    faFlag,
    faWindowMaximize,
    faDownload,
    faComments,
    faEye,
    faEyeSlash
  );
}

export default setupIcons;
