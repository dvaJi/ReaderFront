import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { injectIntl } from 'react-intl';

// App imports
import { languageNameToId, chapterTitle, chapterUrl } from '../../utils/common';
import ErrorGeneral from '../../common/ErrorGeneral';
import ErrorNotFound from '../../common/ErrorNotFound';
import Metatag from './ReaderMetaTags';
import ReaderControls from './ReaderControls';
import ReaderLoading from '.../components/ReaderLoading';
import ImagesList from '../components/ImagesList';
import Comments from '../components/Comments';
import { FETCH_CHAPTER } from './queries';
import { ReaderMain } from '../components/styles';

function ReaderContainer({ match, history, intl }) {
  const [showComments, toggleComments] = useState(false);
  const [showNav, toggleNav] = useState(true);
  useEffect(() => {
    let timer1 = setTimeout(() => toggleNav(false), 5000);

    return () => {
      clearTimeout(timer1);
    };
  }, [showNav]);
  const { stub, chapter, subchapter, volume, lang } = match.params;
  const variables = {
    workStub: stub,
    language: languageNameToId(lang),
    volume: parseInt(volume, 0),
    chapter: parseInt(chapter, 0),
    subchapter: parseInt(subchapter, 0)
  };
  return (
    <ReaderMain onMouseMove={() => toggleNav(true)}>
      <Query query={FETCH_CHAPTER} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) return <ReaderLoading />;
          if (error) return <ErrorGeneral />;
          if (!data.chapterByWorkAndChapter) return <ErrorNotFound />;

          const actualChapter = data.chapterByWorkAndChapter;

          const disqusConfig = {
            id: `${actualChapter.work.uniqid}-${actualChapter.uniqid}`,
            path: chapterUrl(actualChapter, actualChapter.work),
            title: chapterTitle({ chapter: actualChapter, intl })
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
                history={history}
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
        }}
      </Query>
    </ReaderMain>
  );
}

const mapStateToProps = (state, own) => {
  return {
    language: state.layout.language,
    match: own.match
  };
};

export default connect(mapStateToProps)(injectIntl(ReaderContainer));
