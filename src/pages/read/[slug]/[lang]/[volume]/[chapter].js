import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { useIntl, FormattedMessage } from 'react-intl';
import gql from 'graphql-tag';

import { chapterTitle as genChapterTitle } from '@shared/lang/chapter-title';
import { languages } from '@shared/params/global';
import { getImage } from '@components/Image';
import { Button } from '@components/ui';
import CenteredMessage from '@components/CenteredMessage';
import ReaderControls from '@components/Read/ReaderControls';
import ReaderLoading from '@components/Read/ReaderLoading';
import BottomActions from '@components/Read/BottomActions';
import ImagesList from '@components/Read/ImagesList';
import Comments from '@components/Read/Comments';
import { ReaderMain } from '@components/Read/styles';

import { withApollo } from 'lib/apollo';
import { logException } from 'lib/analytics';
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
        licensed
        hidden
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
  if (error) {
    logException(JSON.stringify(error), true);
    return 'Error';
  }

  if (
    !data.chapterByWorkAndChapter ||
    data.chapterByWorkAndChapter.work.hidden
  ) {
    return (
      <CenteredMessage>
        <p>
          {f({
            id: 'unknown_error',
            defaultMessage: 'There was some error. Please try again.'
          })}
        </p>
        <Button onClick={() => router.push(`/`)}>
          {f({ id: 'back', defaultMessage: 'Back' })}
        </Button>
      </CenteredMessage>
    );
  }

  const currentChapter = data.chapterByWorkAndChapter;

  const chapterTitle = genChapterTitle({ chapter: currentChapter, f, lang });

  const disqusConfig = {
    id: `${currentChapter.work.uniqid}-${currentChapter.uniqid}`,
    path: currentChapter.read_path,
    title: chapterTitle
  };

  if (currentChapter.work.licensed) {
    return (
      <CenteredMessage>
        <p>
          {f({
            id: 'license_no_chapters',
            defaultMessage: 'Chapters were removed due this work got licensed.'
          })}
        </p>
        <Button onClick={() => router.push(`/work/${lang}/${slug}`)}>
          {f({ id: 'back', defaultMessage: 'Back' })}
        </Button>
      </CenteredMessage>
    );
  }

  return (
    <>
      <ReaderMetatags
        currentChapter={currentChapter}
        chapterTitle={chapterTitle}
      />
      <ReaderControls
        work={currentChapter.work}
        chapter={currentChapter}
        language={language.id}
        showNav={showNav}
      />
      <ImagesList
        id={currentChapter.id}
        pages={currentChapter.pages}
        chapter={currentChapter}
      />
      <BottomActions chapter={currentChapter} />
      <Comments
        id={disqusConfig.id}
        title={disqusConfig.title}
        path={disqusConfig.path}
      />
    </>
  );
}

const ReaderMetatags = React.memo(({ currentChapter, chapterTitle }) => {
  const router = useRouter();
  const chapterThumb = getImage(currentChapter.thumbnail_path);

  const { lang } = router.query;

  return (
    <>
      <Helmet defer={false}>
        <meta charSet="utf-8" />
        <meta name="language" content={lang} />
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
        <link rel="canonical" href={`${APP_URL}${currentChapter.read_path}`} />
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
        { "@type": "ListItem", "position": 1, "item": { "@id": "${APP_URL}", "name": "${APP_TITLE}" } },
        { "@type": "ListItem", "position": 2, "item": { "@id": "${APP_URL}/work/all", "name": "Works" } },
        { "@type": "ListItem", "position": 3, "item": { "@id": "${APP_URL}/work/${lang}/${currentChapter.work.stub}", "name": "${currentChapter.work.name}" } },
        { "@type": "ListItem", "position": 4, "item": { "@id": "${APP_URL}${router.asPath}", "name": "${chapterTitle}" } }
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
      "inLanguage": "${lang}",
      "image": "${chapterThumb}",
      "thumbnailUrl": "${chapterThumb}"
    }
  }
  `}
        </script>
      </Helmet>
      <FormattedMessage
        id={`reader.title_${lang}`}
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
  );
});

export default withApollo(ReaderContainer);
