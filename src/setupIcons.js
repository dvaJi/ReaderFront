import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faCog,
  faAngleLeft,
  faAngleRight,
  faFlag,
  faWindowMaximize
} from '@fortawesome/free-solid-svg-icons';

function setupIcons() {
  library.add(faCog, faAngleLeft, faAngleRight, faFlag, faWindowMaximize);
}

export default setupIcons;
