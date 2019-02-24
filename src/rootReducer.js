import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { intlReducer } from 'react-intl-redux';

import layout from './layout/reducers';
import user from './user/reducers/applyUser';

export default history =>
  combineReducers({
    layout,
    user,
    intl: intlReducer,
    router: connectRouter(history)
  });
