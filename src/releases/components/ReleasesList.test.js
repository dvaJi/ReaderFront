import React from 'react';
import I18n from 'redux-i18n';
import { Provider } from 'react-redux';
import { render, mount } from 'enzyme';
import ReleasesList from './ReleasesList';
import ReleaseCard from './ReleaseCard';
import ReleaseCardEmpty from './ReleaseCardEmpty';
import { BrowserRouter } from 'react-router-dom';
import { translations } from '../../translations';
import store from '../../store';
import { getReleases } from '../../utils/mocks/getReleasesMock';

const releases = getReleases();

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <I18n translations={translations}>
        <ReleasesList loading={true} releases={[]} />
      </I18n>
    </Provider>
  );
});

it('should render releases without crashing', () => {
  mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <BrowserRouter>
          <ReleasesList loading={false} releases={releases} />
        </BrowserRouter>
      </I18n>
    </Provider>
  );
});

it('renders RealeaseCard without crashing', () => {
  const listReleaseCard = generateReleaseCard(releases);
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <BrowserRouter>
          <ReleasesList loading={false} releases={releases} />
        </BrowserRouter>
      </I18n>
    </Provider>
  );
  expect(
    wrapper.children().containsMatchingElement(listReleaseCard)
  ).toBeTruthy();
  wrapper.unmount();
});

it('renders RealeaseCard and fetching data without crashing', () => {
  const listReleaseCard = generateReleaseCard(releases);
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <BrowserRouter>
          <ReleasesList loading={false} releases={releases} />
        </BrowserRouter>
      </I18n>
    </Provider>
  );
  expect(
    wrapper.children().containsMatchingElement(listReleaseCard)
  ).toBeTruthy();
  wrapper.unmount();
});

it('renders RealeaseCard and add RealeaseCardEmpty while is loading', () => {
  const listReleaseCard = generateReleaseCard(releases);
  const wrapper = mount(
    <Provider store={store}>
      <I18n translations={translations}>
        <BrowserRouter>
          <ReleasesList loading={true} releases={releases} />
        </BrowserRouter>
      </I18n>
    </Provider>
  );
  expect(
    wrapper.children().containsMatchingElement(listReleaseCard)
  ).toBeTruthy();
  wrapper.unmount();
});

it('renders RealeaseCardEmpty without crashing', () => {
  const listReleaseCardEmpty = generateReleaseCardEmpty();
  const wrapper = mount(
    <BrowserRouter>
      <ReleasesList loading={true} releases={[]} />
    </BrowserRouter>
  );
  expect(wrapper.children().contains(listReleaseCardEmpty)).toBeTruthy();
  wrapper.unmount();
});

/**
 * Generate a ReleaseCardEmpty list
 *
 * @returns ReleaseCardEmpty list
 */
function generateReleaseCardEmpty() {
  let listReleaseCardEmpty = [];
  for (let index = 1; index <= 15; index++) {
    listReleaseCardEmpty.push(<ReleaseCardEmpty key={index} />);
  }

  return listReleaseCardEmpty;
}

/**
 * Generate a ReleaseCard mock
 *
 * @param {any} releases
 * @returns ReleaseCard list
 */
function generateReleaseCard(releases) {
  let listReleaseCard = [];
  releases.forEach(release => {
    listReleaseCard.push(
      <ReleaseCard
        key={release.id}
        url={''}
        name={release.chapter.name}
        thumb={release.chapter.thumbnail}
        chapter={release.chapter.chapter}
        subchapter={release.chapter.subchapter}
      />
    );
  });

  return listReleaseCard;
}
