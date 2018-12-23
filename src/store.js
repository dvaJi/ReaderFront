import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import createRootReducer from './rootReducer';

export const history = createHistory();

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);

export default store;
