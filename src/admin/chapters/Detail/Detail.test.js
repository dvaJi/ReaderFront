import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import Dropzone from 'react-dropzone';

// App imports
import Detail from './Detail';
import { FETCH_CHAPTER } from '../query';

const releases = global.rfMocks.releases.getReleases;
const pages = global.rfMocks.releases.getPages;

const mocks = [
  {
    request: {
      query: FETCH_CHAPTER,
      variables: { chapterId: 1 }
    },
    result: {
      data: {
        chapterById: { ...releases[0], pages: pages }
      }
    }
  }
];

it('should render the chapter with pages', async () => {
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'select-default-1298337316');
  document.body.appendChild(div);

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/admincp/work/1/infection/chapter/1']}>
        <Route path="/admincp/work/:workId/:stub/chapter/:chapterId">
          <Detail />
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

it("should show an error message if it can't fetch data", async () => {
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'select-default-1298337316');
  document.body.appendChild(div);

  const errorMock = {
    request: {
      query: FETCH_CHAPTER,
      variables: { chapterId: 1 }
    },
    error: new Error('Nope')
  };
  const wrapper = mountWithIntl(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <MemoryRouter initialEntries={['/admincp/work/1/infection/chapter/1']}>
        <Route path="/admincp/work/:workId/:stub/chapter/:chapterId">
          <Detail />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper.text()).toContain('Error');
    wrapper.unmount();
  });
});

it('should allow to add pages', async () => {
  const mocksAddPages = [
    {
      request: {
        query: FETCH_CHAPTER,
        variables: { chapterId: 1 }
      },
      result: {
        data: {
          chapterById: { ...releases[0], pages: [] }
        }
      }
    }
  ];
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocksAddPages} addTypename={false}>
      <MemoryRouter initialEntries={['/admincp/work/1/infection/chapter/1']}>
        <Route path="/admincp/work/:workId/:stub/chapter/:chapterId">
          <Detail
            match={{
              params: {
                workId: '1',
                stub: 'Infection',
                chapterId: '1'
              }
            }}
          />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);

    let image = {
      name: 'plot.jpg',
      size: 1000,
      type: 'image/jpeg'
    };

    const fileContents = image;
    const file = new Blob([fileContents], { type: 'text/plain' });
    expect(file).toBeDefined();

    await global.wait(0);

    const drop = wrapper.find(Dropzone);
    expect(drop).toBeDefined();

    await global.wait(0);

    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});
