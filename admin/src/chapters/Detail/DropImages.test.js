import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MockedProvider } from '@apollo/react-testing';

// App imports
import DropImages from './DropImages';
import {
  UPDATE_DEFAULT_PAGE,
  REMOVE_PAGE,
  CREATE_PAGE,
  UPDATE_CHAPTER_STATUS
} from '../mutations';

class MockFileReader {
  onerror() {}
  onload() {}
  readAsDataURL() {
    this.result = 'result';
    this.onload();
  }
}

const releases = global.rfMocks.releases.getReleases;
const pagesUploaded = global.rfMocks.releases.getPagesUploaded;
const pagesAsFile = global.rfMocks.releases.getPagesAsFiles;

const toggleModalMock = jest.fn();
const originalFileReader = FileReader;

beforeEach(() => {
  window.FileReader = MockFileReader;
});

afterEach(() => {
  window.FileReader = originalFileReader;
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

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocksPagesUploaded} addTypename={false}>
      <DropImages
        chapter={{ ...releases[0], pages: pagesAsFile }}
        toggleModal={toggleModalMock}
      />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);

    const changeView = wrapper.find('button#thumbnails-view');
    changeView.simulate('click');

    await global.wait(0);

    const selectAsDefault = wrapper.find('div#select-default-0');
    selectAsDefault.simulate('click');

    await global.wait(0);

    const props = wrapper.find(DropImages).props();
    await global.wait(0);

    expect(props).toBeDefined();

    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
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

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocksDeletPage} addTypename={false}>
      <DropImages
        chapter={{ ...releases[0], pages: pagesUploaded }}
        toggleModal={toggleModalMock}
      />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    // Click delete all pages button
    wrapper.find('button[id="delete-all-pages"]').simulate('click');
    await global.wait(0);

    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
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
          size: 1234,
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
    },
    {
      request: {
        query: UPDATE_CHAPTER_STATUS,
        variables: {
          id: 1,
          hidden: false
        }
      },
      result: {
        data: {
          chapterStatusUpdate: {
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

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocksDeletPage} addTypename={false}>
      <DropImages
        chapter={{ ...releases[0], pages: [] }}
        toggleModal={toggleModalMock}
      />
    </MockedProvider>
  );

  await global.wait(0);

  //Create a non-null file
  const IMAGES = [global.createFile('page_01.jpg', 1234, 'image/jpeg')];

  await actions(wrapper, async () => {
    wrapper
      .find('#dropzone-pages')
      .props()
      .onDrop(IMAGES);
    const uploadAllButton = wrapper.find('button[id="upload-all-pages"]');
    uploadAllButton.simulate('click');

    wrapper.update();

    const props = wrapper.find(DropImages).props();

    expect(props).toBeDefined();

    wrapper.unmount();
  });
});
