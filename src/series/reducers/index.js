import { combineReducers } from "redux";
import {
  series,
  latestSeries,
  seriesFilterText,
  seriesHasErrored,
  seriesIsLoading,
  latestSeriesIsLoading
} from "./applySeries";

export default combineReducers({
  series,
  latestSeries,
  seriesFilterText,
  seriesHasErrored,
  seriesIsLoading,
  latestSeriesIsLoading
});
