import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { compose, graphql } from 'react-apollo';
import { useIntl } from 'react-intl';

import { Card } from 'common/ui';
import { useLocalStorage } from 'common/useLocalStorage';
import { slugify, forEachSeries } from 'utils/helpers';
import { uploadImage } from 'utils/common';
import PagesList from './PagesList';
import DetailActions from './DetailActions';
import {
  CREATE_PAGE,
  REMOVE_PAGE,
  UPDATE_PAGE,
  UPDATE_DEFAULT_PAGE
} from '../mutations';

function DropImages({
  chapter,
  createPage,
  removePage,
  updatePage,
  updateDefaultPage,
  toggleModal
}) {
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [pages, setPages] = useState(
    chapter.pages.map(pag => ({ ...pag, uploaded: true }))
  );
  const [defaultPage, setDefaultPage] = useState(chapter.thumbnail);
  const [pageView, setPageView] = useLocalStorage('acpUploadView', 'list');

  const { formatMessage: f } = useIntl();

  const handleOnDrop = files => {
    const filenames = pages.map(p => p.filename);
    const nonDuplicates = files.filter(f => !filenames.includes(f.name));
    const newPages = [
      ...pages,
      ...nonDuplicates.map(f => ({
        filename: f.name,
        file: f,
        uploaded: false,
        isUploading: false,
        hasError: f.size > 2411724
      }))
    ].sort((p1, p2) =>
      slugify(p1.filename).localeCompare(slugify(p2.filename))
    );

    setPages(newPages);
  };

  const handleUploadFile = async file => {
    setIsUploading(true);
    setPages(
      [
        ...pages.filter(p => p.filename !== file.filename),
        { ...file, isUploading: true, hasError: false }
      ].sort((p1, p2) => p1.filename.localeCompare(p2.filename))
    );

    let data = new FormData();
    data.append('file', file.file);

    try {
      const uploadResponse = await uploadImage(data);

      const newPage = {
        chapterId: chapter.id,
        filename: uploadResponse.data.file,
        hidden: false,
        height: 0,
        width: 0,
        size: file.file.size,
        mime: file.file.type,
        file: file.file
      };

      const pageToUpload = Object.assign({}, newPage);
      delete pageToUpload.file;

      try {
        const createResponse = await createPage({
          variables: { ...pageToUpload }
        });
        if (
          createResponse.data.errors &&
          createResponse.data.errors.length > 0
        ) {
          setError(createResponse.data.errors[0].message);
        } else {
          const newPages = [
            ...pages.filter(p => p.filename !== file.filename),
            {
              ...file,
              id: createResponse.data.pageCreate.id,
              uploaded: true,
              isUploading: false,
              hasError: false,
              size: file.file.size,
              file: undefined,
              filename: uploadResponse.data.file
            }
          ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));

          setPages(newPages);
          setIsUploading(false);
          return file;
        }
      } catch (err) {
        const newPages = [
          ...pages.filter(p => p.filename !== file.filename),
          { ...file, isUploading: false, hasError: true }
        ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));

        setPages(newPages);
        setError(
          f({
            id: 'unknown_error',
            defaultMessage: 'There was some error. Please try again.'
          })
        );
        setIsUploading(false);
        return null;
      }
    } catch (err) {
      const newPages = [
        ...pages.filter(p => p.filename !== file.filename),
        { ...file, isUploading: false, hasError: true }
      ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));

      setPages(newPages);
      setError(
        f({
          id: 'unknown_error',
          defaultMessage: 'There was some error. Please try again.'
        })
      );
      setIsUploading(false);
      return null;
    }
  };

  const handleUploadAll = async () => {
    const pagesToUpload = pages.filter(
      page => page.file !== undefined && !page.hasError
    );

    if (pagesToUpload.length > 0) {
      await forEachSeries(pagesToUpload, async page => {
        await handleUploadFile(page);
      });

      if (
        (chapter.thumbnail === '' || chapter.thumbnail === null) &&
        pages.length > 0
      ) {
        const index = pages.length < 3 ? 0 : 2;
        await handleSetDefaultPage(pages[index]);
      }

      toggleModal(true);
    }
  };

  const handleRemoveFile = async page => {
    const id = page.id;
    if (page.uploaded) {
      await removePage({ variables: { id } });

      if (page.filename === chapter.thumbnail) {
        await updateDefaultPage({
          variables: { id: chapter.id, thumbnail: null }
        });
      }
    }

    const newPagesList = [
      ...pages.filter(p => p.filename !== page.filename)
    ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));

    await setPages(newPagesList);
  };

  const handleRemoveAll = async () => {
    await forEachSeries(pages, async page => {
      await handleRemoveFile(page);
    });

    if (chapter.thumbnail !== null || chapter.thumbnail !== '') {
      await updateDefaultPage({
        variables: { id: chapter.id, thumbnail: null }
      });
    }

    setPages([]);
  };

  const handleSetDefaultPage = async file => {
    setDefaultPage(file.filename);
    try {
      await updateDefaultPage({
        variables: { id: chapter.id, thumbnail: file.filename }
      });
    } catch (err) {
      setDefaultPage(null);
    }
  };

  return (
    <>
      <DetailActions
        uploadAll={handleUploadAll}
        deleteAll={handleRemoveAll}
        changeView={setPageView}
        isUploading={isUploading}
        actualView={pageView}
        pages={pages}
      />
      {error}
      <Card>
        <Dropzone
          id="dropzone-pages"
          accept="image/jpeg, image/png, image/gif"
          onDrop={handleOnDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              style={{
                background: '#edf0f4',
                height: 100,
                textAlign: 'center',
                borderRadius: 5,
                margin: 10
              }}
            >
              <input {...getInputProps()} />
              <p style={{ paddingTop: '40px' }}>
                {f({
                  id: 'drop_or_browse_files',
                  defaultMessage: 'Drop or Browse images'
                })}
              </p>
            </div>
          )}
        </Dropzone>
        <PagesList
          pages={pages}
          chapter={chapter}
          defaultPage={defaultPage}
          actualView={pageView}
          handleUpload={handleUploadFile}
          handleSelectDefaultPage={handleSetDefaultPage}
          handleRemovePage={handleRemoveFile}
        />
      </Card>
    </>
  );
}

export default compose(
  graphql(CREATE_PAGE, { name: 'createPage' }),
  graphql(REMOVE_PAGE, { name: 'removePage' }),
  graphql(UPDATE_PAGE, { name: 'updatePage' }),
  graphql(UPDATE_DEFAULT_PAGE, { name: 'updateDefaultPage' })
)(DropImages);
