import React, { memo, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useIntl } from 'react-intl';
import Dropzone from 'react-dropzone';
import theme from 'styled-theming';
import styled from 'styled-components';

import { slugify } from '../../../../shared/slugify';
import { asyncForeach } from '../../../../shared/async-foreach';

import { useLocalStorage } from 'common/useLocalStorage';

import { Card } from 'common/ui';
import PagesList from './PagesList';
import DetailActions from './DetailActions';
import { FETCH_CHAPTER } from '../query';
import {
  CREATE_PAGE,
  REMOVE_PAGE,
  UPDATE_DEFAULT_PAGE,
  UPDATE_CHAPTER_STATUS
} from '../mutations';
import { background } from '../../themes';

const inputBackgroundColor = theme('mode', {
  light: background.dark.lightest,
  dark: background.light.darkest
});

const DropImagesWrapper = styled.div`
  background: ${inputBackgroundColor};
  height: 100px;
  text-align: center;
  border-radius: 5px;
  margin: 10px 0;
`;

function DropImages({ chapter, toggleModal }) {
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [pages, setPages] = useState(
    chapter.pages.map(pag => ({ ...pag, uploaded: true }))
  );
  const [defaultPage, setDefaultPage] = useState(chapter.thumbnail);
  const [pageView, setPageView] = useLocalStorage('acpUploadView', 'list');

  const { formatMessage: f } = useIntl();
  const [createPage] = useMutation(CREATE_PAGE);
  const [removePage] = useMutation(REMOVE_PAGE);
  const [updateDefaultPage] = useMutation(UPDATE_DEFAULT_PAGE);
  const [updateChapterStatus] = useMutation(UPDATE_CHAPTER_STATUS);

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
      slugify(p1.filename, true).localeCompare(slugify(p2.filename, true))
    );

    setPages(newPages);
  };

  const handleUploadFile = async (file, pagesUploaded = [], isLast = true) => {
    const actualPages = pages
      .filter(p => p.filename !== file.filename)
      .map(p => ({
        ...p,
        uploaded: p.uploaded || pagesUploaded.includes(p.filename)
      }));
    setIsUploading(true);
    setPages(
      [
        ...actualPages,
        { ...file, isUploading: true, hasError: false }
      ].sort((p1, p2) => p1.filename.localeCompare(p2.filename))
    );

    try {
      const newPage = {
        chapterId: chapter.id,
        size: file.file.size,
        file: file.file
      };

      try {
        const refetchQueries = isLast
          ? {
              refetchQueries: [
                {
                  query: FETCH_CHAPTER,
                  variables: { chapterId: chapter.id }
                }
              ]
            }
          : {};
        const { data: createData } = await createPage({
          variables: { ...newPage },
          ...refetchQueries
        });
        if (createData.errors && createData.errors.length > 0) {
          setError(createData.errors[0].message);
        } else {
          const newPages = [
            ...pages
              .filter(p => p.filename !== file.filename)
              .map(p => {
                return {
                  ...p,
                  uploaded: p.uploaded || pagesUploaded.includes(p.filename)
                };
              }),
            {
              ...file,
              ...createData.pageCreate,
              uploaded: true,
              isUploading: false,
              hasError: false,
              size: file.file.size,
              file: undefined
            }
          ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));

          setPages(newPages);
          setIsUploading(false);
          return file;
        }
      } catch (err) {
        const newPages = [
          ...pages
            .filter(p => p.filename !== file.filename)
            .map(p => ({
              ...p,
              uploaded: p.uploaded || pagesUploaded.includes(p.filename)
            })),
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
        ...pages
          .filter(p => p.filename !== file.filename)
          .map(p => ({
            ...p,
            uploaded: p.uploaded || pagesUploaded.includes(p.filename)
          })),
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

    let pagesUploaded = [];
    if (pagesToUpload.length > 0) {
      await asyncForeach(pagesToUpload, async (page, i) => {
        const isLast = pagesToUpload.length === i + 1;
        await handleUploadFile(page, pagesUploaded, isLast);
        pagesUploaded.push(page.filename);
      });

      if (
        (chapter.thumbnail === '' || chapter.thumbnail === null) &&
        pages.length > 0
      ) {
        const index = pages.length < 3 ? 0 : 2;
        await handleSetDefaultPage(pages[index]);
      }

      await handlePublishChapter();

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
    await asyncForeach(pages, async page => {
      await handleRemoveFile(page);
    });

    if (chapter.thumbnail !== null || chapter.thumbnail !== '') {
      await updateDefaultPage({
        variables: { id: chapter.id, thumbnail: null }
      });
    }

    setPages([]);
  };

  const handlePublishChapter = async () => {
    await updateChapterStatus({ variables: { id: chapter.id, hidden: false } });
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
            <DropImagesWrapper {...getRootProps()}>
              <input {...getInputProps()} />
              <p style={{ paddingTop: '40px' }}>
                {f({
                  id: 'drop_or_browse_files',
                  defaultMessage: 'Drop or Browse images'
                })}
              </p>
            </DropImagesWrapper>
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

export default memo(DropImages);
