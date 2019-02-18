import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { intlReducer } from 'react-intl-redux';

import releases from './releases/reducers';
import reader from './reader/reducers';
import layout from './layout/reducers';
import user from './user/reducers/applyUser';

export default history =>
  combineReducers({
    releases,
    reader,
    layout,
    user,
    intl: intlReducer,
    router: connectRouter(history)
  });
