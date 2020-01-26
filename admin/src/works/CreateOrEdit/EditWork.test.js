import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

// App imports
import EditWork from './EditWork';
import { UPDATE_WORK } from '../mutation';
import { FETCH_WORK } from '../query';

const work = global.rfMocks.work.work;
const mocks = [
  {
    request: {
      query: FETCH_WORK,
      variables: { stub: 'infection', language: -1 }
    },
    result: {
      data: {
        work: work
      }
    }
  },
  {
    request: {
      query: UPDATE_WORK,
      variables: work
    },
    result: {
      data: {
        workUpdate: { id: 1 }
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/work/edit/infection']}>
        <Route path="/work/edit/:stub">
          <EditWork />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});
