import { combineReducers } from "redux";
import { work, randomWork, workHasErrored, workIsLoading, workRandomIsLoading } from "./applyWork";

export default combineReducers({
    work,
    randomWork,
    workHasErrored,
    workIsLoading,
    workRandomIsLoading
});
