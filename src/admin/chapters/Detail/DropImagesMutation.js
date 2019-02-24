import React from 'react';
import { Mutation } from 'react-apollo';

import {
  CREATE_PAGE,
  REMOVE_PAGE,
  UPDATE_PAGE,
  UPDATE_DEFAULT_PAGE
} from '../mutations';

export const CreatePage = Component => props => (
  <Mutation mutation={CREATE_PAGE}>
    {createPage => <Component {...props} createPage={createPage} />}
  </Mutation>
);

export const RemovePage = Component => props => (
  <Mutation mutation={REMOVE_PAGE}>
    {removePage => <Component {...props} removePage={removePage} />}
  </Mutation>
);

export const UpdatePage = Component => props => (
  <Mutation mutation={UPDATE_PAGE}>
    {updatePage => <Component {...props} updatePage={updatePage} />}
  </Mutation>
);

export const UpdateDefaultPage = Component => props => (
  <Mutation mutation={UPDATE_DEFAULT_PAGE}>
    {updateDefaultPage => (
      <Component {...props} updateDefaultPage={updateDefaultPage} />
    )}
  </Mutation>
);

export const WithMutation = Component =>
  CreatePage(RemovePage(UpdatePage(UpdateDefaultPage(Component))));
