import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

// App imports
import { languageNameToId, chapterTitle, chapterUrl } from 'utils/common';
import ErrorGeneral from 'common/ErrorGeneral';
import ErrorNotFound from 'common/ErrorNotFound';
import Metatag from './ReaderMetaTags';
import ReaderControls from './ReaderControls';
import ReaderLoading from '../components/ReaderLoading';
import ImagesList from '../components/ImagesList';
import Comments from '../components/Comments';
import { FETCH_CHAPTER } from './queries';
import { ReaderMain } from '../components/styles';

function ReaderContainer() {
  const [showNav, toggleNav] = useState(true);

  useEffect(() => {
    let navTimer = setTimeout(() => toggleNav(false), 5000);

    return () => {
      clearTimeout(navTimer);
    };
  }, [showNav]);

  return (
    <ReaderMain onMouseMove={() => toggleNav(true)}>
      <ReaderContent showNav={showNav} />
    </ReaderMain>
  );
}

function ReaderContent({ showNav }) {
  const [showComments, toggleComments] = useState(false);
  const { stub, chapter, subchapter, volume, lang } = useParams();
  const { formatMessage: f } = useIntl();
  const { loading, error, data } = useQuery(FETCH_CHAPTER, {
    variables: {
      workStub: stub,
      language: languageNameToId(lang),
      volume: Number(volume),
      chapter: Number(chapter),
      subchapter: Number(subchapter)
    }
  });

  if (loading) return <ReaderLoading />;
  if (error) return <ErrorGeneral />;
  if (!data.chapterByWorkAndChapter) return <ErrorNotFound />;

  const actualChapter = data.chapterByWorkAndChapter;

  const disqusConfig = {
    id: `${actualChapter.work.uniqid}-${actualChapter.uniqid}`,
    path: chapterUrl(actualChapter, actualChapter.work),
    title: chapterTitle({ chapter: actualChapter, f })
  };

  return (
    <>
      <Metatag chapter={actualChapter} />
      <ReaderControls
        work={actualChapter.work}
        chapter={actualChapter}
        language={languageNameToId(lang)}
        toggleComments={toggleComments}
        showNav={showNav}
      />
      <ImagesList
        id={actualChapter.id}
        pages={actualChapter.pages}
        chapter={actualChapter}
      />
      <Comments
        id={disqusConfig.id}
        title={disqusConfig.title}
        path={disqusConfig.path}
        isOpen={showComments}
        toggle={toggleComments}
      />
    </>
  );
}

export default ReaderContainer;
