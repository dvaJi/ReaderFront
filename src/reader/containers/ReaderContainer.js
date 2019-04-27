import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

// App imports
import { languageNameToId, languageIdToName } from '../../utils/common';
import Metatag from './ReaderMetaTags';
import ReaderBar from '../components/ReaderBar';
import ReaderBarEmpty from '../components/ReaderBarEmpty';
import ImagesList from '../components/ImagesList';
import { FETCH_CHAPTERS, FETCH_CHAPTER } from './queries';

const Comments = React.lazy(() => import('../components/Comments'));

const Chapters = ({ workStub, language, chapter }) => (
  <Query query={FETCH_CHAPTERS} variables={{ workStub, language }}>
    {({ loading, error, data }) => {
      if (loading || error) return <ReaderBarEmpty />;
      const chapterIndex = data.chaptersByWork.indexOf(
        data.chaptersByWork.find(c => c.id === chapter.id)
      );
      const nextChapter =
        chapterIndex + 1 !== data.chaptersByWork.length ? chapterIndex + 1 : -1;
      const prevChapter = chapterIndex !== 0 ? chapterIndex - 1 : -1;
      return (
        <ReaderBar
          chapter={chapter}
          chapters={data.chaptersByWork}
          work={chapter.work}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
        />
      );
    }}
  </Query>
);

function ReaderContainer({ match }) {
  const { stub, chapter, subchapter, volume, lang } = match.params;
  const variables = {
    workStub: stub,
    language: languageNameToId(lang),
    volume: parseInt(volume, 0),
    chapter: parseInt(chapter, 0),
    subchapter: parseInt(subchapter, 0)
  };
  return (
    <div className="Read">
      <Query query={FETCH_CHAPTER} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) return <ReaderBarEmpty />;
          if (error) return <p id="error_releases">Error :(</p>;

          const actualChapter = data.chapterByWorkAndChapter;

          const disqusConfig = {
            id: `${actualChapter.work.uniqid}-${actualChapter.uniqid}`,
            path: `read/${actualChapter.work.stub}/${languageIdToName(
              actualChapter.language
            )}/${actualChapter.volume}/${actualChapter.chapter}.${
              actualChapter.subchapter
            }`,
            title: `${actualChapter.work.name} - Capítulo ${
              actualChapter.chapter
            } | ${languageIdToName(actualChapter.language).toUpperCase()} `
          };

          return (
            <>
              <Metatag chapter={actualChapter} />
              <Chapters
                chapter={actualChapter}
                workStub={stub}
                language={languageNameToId(lang)}
              />
              <ImagesList
                id={actualChapter.id}
                pages={actualChapter.pages}
                chapter={actualChapter}
              />
              <Suspense fallback={'Loading comments...'}>
                <Comments
                  id={disqusConfig.id}
                  title={disqusConfig.title}
                  path={disqusConfig.path}
                />
              </Suspense>
            </>
          );
        }}
      </Query>
    </div>
  );
}

const mapStateToProps = (state, own) => {
  return {
    language: state.layout.language,
    match: own.match
  };
};

export default connect(mapStateToProps)(ReaderContainer);
