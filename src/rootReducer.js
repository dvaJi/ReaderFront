import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { i18nState } from "redux-i18n";

import releases from "./releases/reducers";
import works from "./works/reducers";
import work from "./work/reducers";
import reader from "./reader/reducers";
import blog from "./blog/reducers";
import layout from "./layout/reducers";

const rootReducer = combineReducers({
  releases,
  works,
  work,
  reader,
  blog,
  layout,
  router: routerReducer,
  i18nState
});

export default rootReducer;
