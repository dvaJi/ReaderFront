import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { APP_TITLE } from '../../config';
import { getChapterPageUrl } from '../../utils/common';

const MetaTag = ({ chapter }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          property="og:image"
          content={getChapterPageUrl(chapter.work, chapter, chapter.thumbnail)}
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={chapter.createdAt} />
        <meta property="article:modified_time" content={chapter.updatedAt} />
        <meta property="article:section" content={chapter.work.name} />
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

export default MetaTag;
