import React from 'react';
import moxios from '@anilanar/moxios';
import { mountWithIntl } from 'enzyme-react-intl';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

// App imports
import DropImages from './DropImages';
import { UPDATE_DEFAULT_PAGE, REMOVE_PAGE, CREATE_PAGE } from '../mutations';

const releases = global.rfMocks.releases.getReleases;
const pagesUploaded = global.rfMocks.releases.getPagesUploaded;
const pagesAsFile = global.rfMocks.releases.getPagesAsFiles;

const toggleModalMock = jest.fn();

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

it('should allow to set a page as default in with thumbnail view', async () => {
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'select-default-0');
  document.body.appendChild(div);

  const mocksPagesUploaded = [
    {
      request: {
        query: UPDATE_DEFAULT_PAGE,
        variables: { id: 1, thumbnail: 'page_01.jpg' }
      },
      result: {
        data: {
          chapterThumbUpdate: {
            id: 1
          }
        }
      }
    }
  ];

  const wrapper = await mountWithIntl(
    <MockedProvider mocks={mocksPagesUploaded} addTypename={false}>
      <MemoryRouter>
        <DropImages
          chapter={{ ...releases[0], pages: pagesAsFile }}
          toggleModal={toggleModalMock}
        />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);

  const changeView = await wrapper.find('button#thumbnails-view');
  await changeView.simulate('click');

  const selectAsDefault = await wrapper.find('div#select-default-0');
  await selectAsDefault.simulate('click');

  const props = await wrapper.find(DropImages).props();
  await global.wait(0);

  expect(props).toBeDefined();

  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('should delete all pages', async () => {
  const mocksDeletPage = [
    {
      request: {
        query: REMOVE_PAGE,
        variables: { id: 1 }
      },
      result: {
        data: {
          pageRemove: {
            id: 1
          }
        }
      }
    },
    {
      request: {
        query: UPDATE_DEFAULT_PAGE,
        variables: { id: 1, thumbnail: null }
      },
      result: {
        data: {
          chapterThumbUpdate: {
            id: 1
          }
        }
      }
    }
  ];
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'select-default-1298337316');
  document.body.appendChild(div);

  const wrapper = await mountWithIntl(
    <MockedProvider mocks={mocksDeletPage} addTypename={false}>
      <MemoryRouter>
        <DropImages
          chapter={{ ...releases[0], pages: pagesUploaded }}
          toggleModal={toggleModalMock}
        />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);

  // Click delete all pages button
  await wrapper.find('button[id="delete-all-pages"]').simulate('click');
  await global.wait(0);

  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('should upload all pages', async () => {
  const mocksDeletPage = [
    {
      request: {
        query: CREATE_PAGE,
        variables: {
          chapterId: 1,
          filename: 'page_01.jpg',
          hidden: false,
          height: 0,
          width: 0,
          size: 13,
          mime: 'image/jpeg'
        }
      },
      result: {
        data: {
          pageCreate: {
            id: 1
          }
        }
      }
    }
  ];

  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'select-default-0');
  document.body.appendChild(div);

  const wrapper = await mountWithIntl(
    <MockedProvider mocks={mocksDeletPage} addTypename={false}>
      <MemoryRouter>
        <DropImages
          chapter={{ ...releases[0], pages: [] }}
          toggleModal={toggleModalMock}
        />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);

  //Create a non-null file
  const fileContents = 'file contents';
  const file = new Blob([fileContents], { type: 'image/jpeg' });
  wrapper
    .find('#dropzone-pages')
    .props()
    .onDrop([file]);
  const uploadAllButton = await wrapper.find('button[id="upload-all-pages"]');
  uploadAllButton.simulate('click');

  await wrapper.update();

  const props = await wrapper.find(DropImages).props();

  expect(props).toBeDefined();

  await setTimeout(() => {}, 1000);

  let request = moxios.requests.mostRecent();
  await request.respondWith({
    status: 200,
    statusText: 'OK',
    response: {
      file: pagesAsFile[0].filename
    }
  });

  await global.wait(0);

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
