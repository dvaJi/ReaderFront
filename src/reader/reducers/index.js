import { combineReducers } from "redux";
import { chapters, chapter, readerHasErrored, readerIsLoading } from "./applyReader";

export default combineReducers({
  chapters,
  chapter,
  readerHasErrored,
  readerIsLoading
});
