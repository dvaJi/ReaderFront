import { combineReducers } from "redux";
import { serie, randomSerie, serieHasErrored, serieIsLoading, serieRandomIsLoading } from "./applySerie";

export default combineReducers({
    serie,
    randomSerie,
    serieHasErrored,
    serieIsLoading,
    serieRandomIsLoading
});
