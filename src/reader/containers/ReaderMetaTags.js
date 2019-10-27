import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';

import { APP_TITLE, APP_URL, APP_VERSION } from '../../config';
import { getImage } from '../../common/Image';
import { languageIdToName } from 'utils/common';

const MetaTag = ({ chapter, intl }) => {
  const chapterThumb = getImage(
    `works/${chapter.work.uniqid}/${chapter.uniqid}/${chapter.thumbnail}`
  );
  const language = languageIdToName(chapter.language);
  const chapterTitle = `${intl.formatMessage({
    id: 'chapter',
    defaultMessage: 'Chapter'
  })} ${chapter.chapter}${chapter.name ? ': ' + chapter.name : ''}`;
  return (
    <>
      <Helmet defer={false}>
        <meta charSet="utf-8" />
        <meta property="og:image" content={chapterThumb} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={chapter.createdAt} />
        <meta property="article:modified_time" content={chapter.updatedAt} />
        <meta property="article:section" content={chapter.work.name} />
        <link
          rel="canonical"
          href={`${APP_URL}read/${chapter.work.stub}/${language}/${chapter.volume}/${chapter.chapter}.${chapter.subchapter}`}
        />
        <script type="application/ld+json">
          {`{
            "@context": "http://schema.org",
            "@type": "WebPage",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "${APP_URL}work/all?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "item": "${APP_TITLE}" },
                { "@type": "ListItem", "position": 2, "item": "${chapter.work.name}" }
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
              "identifier": "urn:uuid:${chapter.uniqid}",
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
              "datePublished": "${chapter.createdAt}",
              "dateModified": "${chapter.updatedAt}",
              "inLanguage": "${language}",
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
          workName: chapter.work.name,
          chapter: chapter.chapter,
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
          workName: chapter.work.name
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
};

export default injectIntl(MetaTag);
