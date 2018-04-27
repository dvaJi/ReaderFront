import { combineReducers } from "redux";
import {
  post,
  posts,
  blogHasErrored,
  blogIsLoading,
  blogPage
} from "./applyBlog";

export default combineReducers({
  post,
  posts,
  blogHasErrored,
  blogIsLoading,
  blogPage
});
