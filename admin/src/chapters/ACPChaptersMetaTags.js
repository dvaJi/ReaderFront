import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { APP_TITLE } from '../config';

export const MetaTagDetail = ({ chapter }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta property="og:type" content="book" />
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
    </>
  );
};

export const MetaTagCreate = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <FormattedMessage
        id="work.create.title"
        defaultMessage="Create work :: {title}"
        values={{ title: APP_TITLE }}
      >
        {title => (
          <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
          </Helmet>
        )}
      </FormattedMessage>
    </>
  );
};

export const MetaTagEdit = ({ workName = '' }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <FormattedMessage
        id="work.edit.title"
        defaultMessage="Edit {workName} :: {title}"
        values={{ title: APP_TITLE, workName }}
      >
        {title => (
          <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
          </Helmet>
        )}
      </FormattedMessage>
    </>
  );
};
