import { combineReducers } from "redux";
import { serie, serieHasErrored, serieIsLoading } from "./applySerie";

export default combineReducers({
    serie,
    serieHasErrored,
    serieIsLoading
});
