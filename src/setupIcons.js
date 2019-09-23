import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faCog,
  faAngleLeft,
  faAngleRight,
  faFlag,
  faWindowMaximize,
  faDownload
} from '@fortawesome/free-solid-svg-icons';

function setupIcons() {
  library.add(
    faCog,
    faAngleLeft,
    faAngleRight,
    faFlag,
    faWindowMaximize,
    faDownload
  );
}

export default setupIcons;
