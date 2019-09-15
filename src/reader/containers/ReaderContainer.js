import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

// App imports
import { languageNameToId, languageIdToName } from '../../utils/common';
import ErrorGeneral from '../../common/ErrorGeneral';
import ErrorNotFound from '../../common/ErrorNotFound';
import Metatag from './ReaderMetaTags';
import ReaderControls from './ReaderControls';
import ReaderBarEmpty from '../components/ReaderBarEmpty';
import ImagesList from '../components/ImagesList';
import { FETCH_CHAPTER } from './queries';

const Comments = React.lazy(() => import('../components/Comments'));

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
          if (error) return <ErrorGeneral />;
          if (!data.chapterByWorkAndChapter) return <ErrorNotFound />;

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
              <ReaderControls
                work={actualChapter.work}
                chapter={actualChapter}
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
