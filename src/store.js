import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import createRootReducer from './rootReducer';

export const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);

export default store;
