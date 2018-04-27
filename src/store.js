import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

export const history = createHistory();

const appRouterMiddleware = routerMiddleware(history);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
    applyMiddleware(appRouterMiddleware)
  )
);

export default store;
