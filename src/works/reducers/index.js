import { combineReducers } from "redux";
import {
  works,
  latestWorks,
  worksFilterText,
  worksHasErrored,
  worksIsLoading,
  latestWorksIsLoading,
  aggregates
} from "./applyWorks";

export default combineReducers({
  works,
  latestWorks,
  worksFilterText,
  worksHasErrored,
  worksIsLoading,
  latestWorksIsLoading,
  aggregates
});
