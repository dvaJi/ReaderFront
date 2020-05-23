import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { useIntl, FormattedMessage } from 'react-intl';
import gql from 'graphql-tag';

import { chapterTitle as genChapterTitle } from '@shared/lang/chapter-title';
import { languages } from '@shared/params/global';
import { getImage } from '@components/Image';
import ReaderControls from '@components/Read/ReaderControls';
import ReaderLoading from '@components/Read/ReaderLoading';
import ImagesList from '@components/Read/ImagesList';
import Comments from '@components/Read/Comments';
import { ReaderMain } from '@components/Read/styles';

import { withApollo } from 'lib/apollo';
import { APP_URL, APP_TITLE, APP_VERSION } from 'lib/config';

export const FETCH_CHAPTER = gql`
  query ChapterByWorkAndChapter(
    $workStub: String
    $language: Int
    $volume: Int
    $chapter: Int
    $subchapter: Int
  ) {
    chapterByWorkAndChapter(
      workStub: $workStub
      language: $language
      volume: $volume
      chapter: $chapter
      subchapter: $subchapter
      showHidden: false
    ) {
      id
      language
      name
      stub
      uniqid
      chapter
      subchapter
      volume
      thumbnail_path
      read_path
      createdAt
      updatedAt
      download_href
      work {
        id
        stub
        name
        uniqid
        language_name
      }
      pages {
        id
        filename
        height
        width
        size
      }
    }
  }
`;

export function ReaderContainer() {
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
  const { formatMessage: f } = useIntl();
  const router = useRouter();
  const { slug, lang, volume, chapter: chaptersub } = router.query;
  const language = languages[lang];
  const { loading, error, data } = useQuery(FETCH_CHAPTER, {
    variables: {
      workStub: slug,
      language: language.id,
      volume: Number(volume),
      chapter: Number(chaptersub.split('.')[0]),
      subchapter: Number(chaptersub.split('.')[1])
    }
  });

  if (loading) return <ReaderLoading />;
  if (error) return 'Error';
  if (!data.chapterByWorkAndChapter) return 'Error';

  const currentChapter = data.chapterByWorkAndChapter;

  const chapterThumb = getImage(currentChapter.thumbnail_path);
  const chapterTitle = genChapterTitle({ chapter: currentChapter, f });

  const disqusConfig = {
    id: `${currentChapter.work.uniqid}-${currentChapter.uniqid}`,
    path: currentChapter.read_path,
    title: chapterTitle
  };

  return (
    <>
      <>
        <Helmet defer={false}>
          <meta charSet="utf-8" />
          <meta property="og:image" content={chapterThumb} />
          <meta property="og:type" content="article" />
          <meta
            property="article:published_time"
            content={currentChapter.createdAt}
          />
          <meta
            property="article:modified_time"
            content={currentChapter.updatedAt}
          />
          <meta property="article:section" content={currentChapter.work.name} />
          <link
            rel="canonical"
            href={`${APP_URL}${currentChapter.read_path}`}
          />
          <script type="application/ld+json">
            {`{
            "@context": "http://schema.org",
            "@type": "WebPage",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "${APP_URL}/work/all?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "item": "${APP_TITLE}" },
                { "@type": "ListItem", "position": 2, "item": "${currentChapter.work.name}" },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": "${chapterTitle}"
                }
              ]
            },
            "provider": "ReaderFront v${APP_VERSION}",
            "mainEntity": {
              "@type": "ComicIssue",
              "identifier": "urn:uuid:${currentChapter.uniqid}",
              "name": "${chapterTitle}",
              "alternativeHeadline": "${chapterTitle}",
              "accessMode": "visual",
              "accessibilityControl": [
                "fullKeyboardControl",
                "fullMouseControl",
                "fullTouchControl"
              ],
              "isAccessibleForFree": true,
              "copyrightHolders": [],
              "publisher": [],
              "datePublished": "${currentChapter.createdAt}",
              "dateModified": "${currentChapter.updatedAt}",
              "inLanguage": "${language.name}",
              "image": "${chapterThumb}",
              "thumbnailUrl": "${chapterThumb}"
            }
          }
          `}
          </script>
        </Helmet>
        <FormattedMessage
          id="reader.title"
          defaultMessage="{workName} :: Chapter {chapter} :: {appTitle}"
          values={{
            workName: currentChapter.work.name,
            chapter: currentChapter.chapter,
            appTitle: APP_TITLE
          }}
        >
          {title => (
            <Helmet>
              <title>{title}</title>
              <meta name="description" content={title} />
              <meta property="og:title" content={title} />
            </Helmet>
          )}
        </FormattedMessage>
        <FormattedMessage
          id="cover_alt"
          defaultMessage="Cover for {workName}"
          values={{
            workName: currentChapter.work.name
          }}
        >
          {coverAlt => (
            <Helmet>
              <meta property="og:image:alt" content={coverAlt} />
            </Helmet>
          )}
        </FormattedMessage>
      </>
      <ReaderControls
        work={currentChapter.work}
        chapter={currentChapter}
        language={language.id}
        toggleComments={toggleComments}
        showNav={showNav}
      />
      <ImagesList
        id={currentChapter.id}
        pages={currentChapter.pages}
        chapter={currentChapter}
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

export default withApollo(ReaderContainer);
