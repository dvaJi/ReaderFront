import { combineReducers } from "redux";
import { chapters, releasesHasErrored, releasesIsLoading, releasesPage } from "./applyReleases";

export default combineReducers({
  chapters,
  releasesHasErrored,
  releasesIsLoading,
  releasesPage
});
