import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import releases from "./releases/reducers";
import series from "./series/reducers";
import serie from "./serie/reducers";
import reader from "./reader/reducers";
import blog from "./blog/reducers";
import layout from "./layout/reducers";

const rootReducer = combineReducers({
  releases,
  series,
  serie,
  reader,
  blog,
  layout,
  router: routerReducer
});

export default rootReducer;
