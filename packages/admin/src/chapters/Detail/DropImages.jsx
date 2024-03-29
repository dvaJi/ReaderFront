import React, { memo, useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { useIntl } from 'react-intl';
import Dropzone from 'react-dropzone';
import theme from 'styled-theming';
import styled from 'styled-components';
import { Alert } from 'reactstrap';

import { slugify, asyncForeach } from '@readerfront/shared';

import { useLocalStorage } from '../../common/useLocalStorage';

import { Card } from '@readerfront/ui';
import PagesList from './PagesList';
import DetailActions from './DetailActions';
import { FETCH_CHAPTER } from '../query';
import {
  CREATE_PAGE,
  REMOVE_PAGE,
  UPDATE_DEFAULT_PAGE,
  UPDATE_CHAPTER_STATUS
} from '../mutations';
import { theme as rfTheme } from '@readerfront/ui';

const { background } = rfTheme;

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
  const pagesRef = useRef(
    chapter.pages.map(pag => ({ ...pag, uploaded: true }))
  );

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
    pagesRef.current = newPages;
  };

  const handleUploadFile = async (file, pagesUploaded = [], isLast = true) => {
    const actualPages = pages
      .filter(p => p.filename !== file.filename)
      .map(p => ({
        ...p,
        uploaded: p.uploaded || pagesUploaded.includes(p.filename)
      }));
    setIsUploading(true);
    const newPages = [
      ...actualPages,
      { ...file, isUploading: true, hasError: false }
    ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));
    setPages(newPages);
    pagesRef.current = newPages;

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
              .map(p => ({
                ...p,
                uploaded: p.uploaded || pagesUploaded.includes(p.filename)
              })),
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
          pagesRef.current = newPages;
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
        pagesRef.current = newPages;
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
      pagesRef.current = newPages;
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

    const pagesUploaded = [];
    if (pagesToUpload.length > 0) {
      await asyncForeach(pagesToUpload, async (page, i) => {
        const isLast = pagesToUpload.length === i + 1;
        await handleUploadFile(page, pagesUploaded, isLast);
        pagesUploaded.push(page.filename);
      });

      // Update default page
      if (
        (chapter.thumbnail === '' || chapter.thumbnail === null) &&
        pagesUploaded.length > 0 &&
        pages.length > 0
      ) {
        const index = pages.length < 3 ? 0 : 2;
        await handleSetDefaultPage(pagesRef.current[index]);
      }

      // update chapter status
      try {
        await updateChapterStatus({
          variables: { id: chapter.id, hidden: false }
        });
      } catch (err) {
        alert(err);
      }

      // Show modal with chapter url
      toggleModal(true);
    }
  };

  const handleRemoveFile = async page => {
    const id = page.id;
    if (page.uploaded) {
      try {
        await removePage({ variables: { id } });
        if (page.filename === chapter.thumbnail) {
          await updateDefaultPage({
            variables: { id: chapter.id, pageId: null }
          });
        }
      } catch (err) {
        alert(err);
      }
    }

    const newPagesList = [
      ...pages.filter(p => p.filename !== page.filename)
    ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));

    setPages(newPagesList);
    pagesRef.current = newPagesList;
  };

  const handleRemoveAll = async () => {
    await asyncForeach(pagesRef.current, async page => {
      await handleRemoveFile(page);
    });

    if (chapter.thumbnail !== null || chapter.thumbnail !== '') {
      try {
        await updateDefaultPage({
          variables: { id: chapter.id, pageId: null }
        });
      } catch (err) {
        if (window !== undefined) {
          alert(err);
        }
      }
    }

    setPages([]);
    pagesRef.current = [];
  };

  const handleSetDefaultPage = async file => {
    return new Promise((resolve, reject) => {
      updateDefaultPage({
        variables: { id: chapter.id, pageId: file.id }
      })
        .then(() => {
          setDefaultPage(file.filename);
          resolve(file.filename);
        })
        .catch(err => {
          setDefaultPage(null);
          reject(err);
        });
    });
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
      {error && <Alert color="danger">{error}</Alert>}
      <Card>
        <Dropzone
          id="dropzone-pages"
          accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
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
