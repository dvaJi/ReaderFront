import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mountWithIntl } from 'enzyme-react-intl';
import { getWork } from '../../../utils/mocks/getWorksMock';
import { normalizeWork } from '../../../utils/normalizeWork';
import RecommendedWork from './RecommendedWork';

const workNormalized = normalizeWork(getWork);

it('renders while loading without crashing', () => {
  const wrapper = mountWithIntl(
    <RecommendedWork
      title={'Test 1'}
      work={null}
      description={''}
      isLoading={true}
    />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders the work', () => {
  const wrapper = mountWithIntl(
    <MemoryRouter>
      <RecommendedWork
        title={'Test 2'}
        work={workNormalized}
        description={'Desc'}
        isLoading={false}
      />
    </MemoryRouter>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders the work without cover', () => {
  const wrapper = mountWithIntl(
    <MemoryRouter>
      <RecommendedWork
        title={'Test 2'}
        work={getWork}
        description={'Desc'}
        isLoading={false}
      />
    </MemoryRouter>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});