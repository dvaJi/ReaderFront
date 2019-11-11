import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';

import { APP_TITLE, APP_VERSION, APP_URL } from '../../config';
import { getImage } from '../../common/Image';

const MetaTag = ({ work, language, intl }) => {
  const workDescription = work.works_descriptions.find(
    e => e.language === language.id
  );
  const description = workDescription ? workDescription.description : '';
  const workThumbnail = getImage(`works/${work.uniqid}/${work.thumbnail}`);
  return (
    <>
      <Helmet defer={false}>
        <meta charSet="utf-8" />
        <title>{work.name + ' :: ' + APP_TITLE}</title>
        <meta property="og:title" content={work.name + ' :: ' + APP_TITLE} />
        <meta property="og:type" content="book" />
        <meta property="og:locale" content={language.name}></meta>
        <meta name="description" content={description} />
        {work.thumbnail !== '' && (
          <meta property="og:image" content={workThumbnail} />
        )}
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
                  { "@type": "ListItem", "position": 2, "item": "${work.name}" }
                ]
              },
              "provider": "ReaderFront v${APP_VERSION}",
              "mainEntity": {
                "@type": "ComicSeries",
                "identifier": "urn:uuid:${work.uniqid},
                "name": "${work.name}",
                "about": "${description}",
                "author": [
                  ${work.people_works
                    .filter(rol => rol.rol === 1)
                    .map(
                      rol => `{
                    "@type": "Person",
                    "name": "${rol.people.name}",
                    "identifier": ${rol.people.id},
                    "url": "/person/${rol.people.stub}/"
                  }`
                    )}
                ],
                "creator": [
                  ${work.people_works
                    .filter(rol => rol.rol === 2)
                    .map(
                      rol => `{
                    "@type": "Person",
                    "name": "${rol.people.name}",
                    "identifier": ${rol.people.id},
                    "url": "/person/${rol.people.stub}/"
                  }`
                    )}
                ],
                "dateCreated": "${work.createdAt}",
                "dateModified": "${work.updatedAt}",
                "genre": [
                  ${work.genres.map(
                    g =>
                      `"${intl.formatMessage({
                        id: g.name,
                        defaultMessage: g.name
                      })}"`
                  )}
                ],
                "copyrightHolder": [],
                ${work.thumbnail !== '' &&
                  `"image": "${workThumbnail}",
                  "thumbnailUrl": "${workThumbnail}"`}
              }
          }`}
        </script>
      </Helmet>
      {work.genres.map(g => (
        <FormattedMessage id={g.name} key={g.name} defaultMessage={g.name}>
          {genre => (
            <Helmet>
              <meta property="book:tag" content={genre} />
            </Helmet>
          )}
        </FormattedMessage>
      ))}
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

export default injectIntl(MetaTag);
