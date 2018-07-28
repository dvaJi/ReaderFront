import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { i18nState } from "redux-i18n";

import releases from "./releases/reducers";
import works from "./works/reducers";
import work from "./work/reducers";
import reader from "./reader/reducers";
import blog from "./blog/reducers";
import layout from "./layout/reducers";
import user from "./user/reducers/applyUser";

const rootReducer = combineReducers({
  releases,
  works,
  work,
  reader,
  blog,
  layout,
  user,
  router: routerReducer,
  i18nState
});

export default rootReducer;
