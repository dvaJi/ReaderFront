import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { APP_TITLE } from '../../config';

export const MetaTagList = () => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
    </Helmet>
    <FormattedMessage
      id="works.title"
      defaultMessage="Projects List :: {title}"
      values={{ title: APP_TITLE }}
    >
      {title => (
        <Helmet>
          <title>{title}</title>
          <meta property="og:title" content={title} />
        </Helmet>
      )}
    </FormattedMessage>
    <FormattedMessage
      id="works.desc"
      defaultMessage="Projects List for {title}"
      values={{ title: APP_TITLE }}
    >
      {desc => (
        <Helmet>
          <meta name="description" content={desc} />
        </Helmet>
      )}
    </FormattedMessage>
  </>
);

export const MetaTagDetail = ({ work }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{work.name + ' :: ' + APP_TITLE}</title>
        <meta property="og:title" content={work.name + ' :: ' + APP_TITLE} />
        <meta property="og:type" content="book" />
      </Helmet>
      <FormattedMessage
        id="cover_alt"
        defaultMessage="Cover for {workName}"
        values={{
          workName: work.name
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
