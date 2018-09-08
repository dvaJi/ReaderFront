import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mountWithIntl } from 'enzyme-react-intl';
import ReleasesList from './ReleasesList';
import ReleaseCard from './ReleaseCard';
import ReleaseCardEmpty from './ReleaseCardEmpty';
import { getReleases } from '../../utils/mocks/getReleasesMock';

const releases = getReleases();
const releaseCard = generateReleaseCard(releases);
const releaseCardEmpty = generateReleaseCardEmpty();

it('renders without crashing', () => {
  mountWithIntl(<ReleasesList loading={true} releases={[]} />);
});

it('should render releases without crashing', () => {
  mountWithIntl(
    <BrowserRouter>
      <ReleasesList loading={false} releases={releases} />
    </BrowserRouter>
  );
});

it('renders RealeaseCard without crashing', () => {
  const wrapper = mountWithIntl(
    <BrowserRouter>
      <ReleasesList loading={false} releases={releases} />
    </BrowserRouter>
  );
  expect(wrapper.children().containsMatchingElement(releaseCard)).toBeTruthy();
  wrapper.unmount();
});

it('renders RealeaseCard and fetching data without crashing', () => {
  const wrapper = mountWithIntl(
    <BrowserRouter>
      <ReleasesList loading={false} releases={releases} />
    </BrowserRouter>
  );
  expect(wrapper.children().containsMatchingElement(releaseCard)).toBeTruthy();
  wrapper.unmount();
});

it('renders RealeaseCard and add RealeaseCardEmpty while is loading', () => {
  const wrapper = mountWithIntl(
    <BrowserRouter>
      <ReleasesList loading={true} releases={releases} />
    </BrowserRouter>
  );
  expect(wrapper.children().containsMatchingElement(releaseCard)).toBeTruthy();
  wrapper.unmount();
});

it('renders RealeaseCardEmpty without crashing', () => {
  const wrapper = mountWithIntl(
    <BrowserRouter>
      <ReleasesList loading={true} releases={[]} />
    </BrowserRouter>
  );
  expect(wrapper.children().contains(releaseCardEmpty)).toBeTruthy();
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
