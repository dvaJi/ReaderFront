import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { intlReducer } from 'react-intl-redux';

import releases from './releases/reducers';
import works from './works/reducers';
import work from './work/reducers';
import reader from './reader/reducers';
import blog from './blog/reducers';
import layout from './layout/reducers';
import user from './user/reducers/applyUser';

export default history =>
  combineReducers({
    releases,
    works,
    work,
    reader,
    blog,
    layout,
    user,
    intl: intlReducer,
    router: connectRouter(history)
  });
