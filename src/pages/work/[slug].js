import React from 'react';
import gql from 'graphql-tag';
import { Container } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { useIntl, FormattedMessage } from 'react-intl';

import { getImage } from '@components/Image';
import Cover from '@components/Work/Cover';
import Info from '@components/Work/Info';
import ChapterList from '@components/Work/ChapterList';
import WorkEmpty from '@components/Work/WorkEmpty';
import { languageNameToId } from 'utils/common';
import { APP_TITLE, APP_VERSION, APP_URL } from 'lib/config';
import { withApollo } from 'lib/apollo';

export const FETCH_WORK = gql`
  query PublicWork($language: Int, $stub: String) {
    work(language: $language, stub: $stub, showHidden: false) {
      id
      name
      stub
      uniqid
      type
      demographicId
      status
      adult
      thumbnail_path
      createdAt
      updatedAt
      chapters {
        id
        chapter
        subchapter
        volume
        language
        language_name
        name
        stub
        uniqid
        thumbnail
        download_href
        read_path
      }
      works_descriptions {
        description
        language
      }
      people_works {
        rol
        people {
          id
          name
          name_kanji
          thumbnail
          stub
          uniqid
          description
        }
      }
      genres {
        id
        name
      }
    }
  }
`;

export function WorkContainer() {
  const router = useRouter();
  const { slug } = router.query;

  const { locale, formatMessage } = useIntl();
  const language = {
    id: languageNameToId(locale),
    name: locale
  };
  const { loading, error, data } = useQuery(FETCH_WORK, {
    variables: { language: language.id, stub: slug }
  });

  if (loading)
    return (
      <Container>
        <WorkEmpty />
      </Container>
    );
  if (error) return <Container id="error_releases">Error :(</Container>;

  const workDescription = data.work.works_descriptions.find(
    e => e.language === language.id
  );
  const description = workDescription ? workDescription.description : '';
  const workThumbnail = getImage(data.work.thumbnail_path);

  return (
    <Container>
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{data.work.name + ' :: ' + APP_TITLE}</title>
          <meta
            property="og:title"
            content={data.work.name + ' :: ' + APP_TITLE}
          />
          <meta property="og:type" content="book" />
          <meta property="og:locale" content={language.name}></meta>
          <meta name="description" content={description} />
          {data.work.thumbnail !== '' && (
            <meta property="og:image" content={workThumbnail} />
          )}
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
                  { "@type": "ListItem", "position": 2, "item": "${
                    data.work.name
                  }" }
                ]
              },
              "provider": "ReaderFront v${APP_VERSION}",
              "mainEntity": {
                "@type": "ComicSeries",
                "identifier": "urn:uuid:${data.work.uniqid},
                "name": "${data.work.name}",
                "about": "${description}",
                "author": [
                  ${data.work.people_works
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
                  ${data.work.people_works
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
                "dateCreated": "${data.work.createdAt}",
                "dateModified": "${data.work.updatedAt}",
                "genre": [
                  ${data.work.genres.map(
                    g =>
                      `"${formatMessage({
                        id: g.name,
                        defaultMessage: g.name
                      })}"`
                  )}
                ],
                "copyrightHolder": [],
                ${data.work.thumbnail !== '' &&
                  `"image": "${workThumbnail}",
                  "thumbnailUrl": "${workThumbnail}"`}
              }
          }`}
          </script>
        </Helmet>
        {data.work.genres.map(g => (
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
            workName: data.work.name
          }}
        >
          {coverAlt => (
            <Helmet>
              <meta property="og:image:alt" content={coverAlt} />
            </Helmet>
          )}
        </FormattedMessage>
      </>
      <div className="row">
        <div className="col-md-4">
          <Cover work={data.work} name={data.work.name} />
        </div>
        <Info
          work={data.work}
          description={data.work.works_descriptions.find(
            e => e.language === language.id
          )}
        />
        <ChapterList work={data.work} language={language} />
      </div>
    </Container>
  );
}

export default withApollo(WorkContainer);
