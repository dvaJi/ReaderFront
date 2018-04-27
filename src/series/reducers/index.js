import { combineReducers } from "redux";
import {
  series,
  seriesFilterText,
  seriesHasErrored,
  seriesIsLoading
} from "./applySeries";

export default combineReducers({
  series,
  seriesFilterText,
  seriesHasErrored,
  seriesIsLoading
});
