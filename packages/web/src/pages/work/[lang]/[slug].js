import React from 'react';
import gql from 'graphql-tag';
import { Container } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useIntl, FormattedMessage } from 'react-intl';

import { getImage } from '@components/Image';
import Cover from '@components/Work/Cover';
import Info from '@components/Work/Info';
import ChapterList from '@components/Work/ChapterList';
import WorkEmpty from '@components/Work/WorkEmpty';
import { languages } from '@readerfront/shared/build/params/global';
import { APP_TITLE, APP_VERSION, APP_URL } from 'lib/config';
import { withApollo } from 'lib/apollo';
import { logException } from 'lib/analytics';

export const FETCH_WORK = gql`
  query PublicWork($language: Int, $stub: String) {
    work(language: $language, stub: $stub, showHidden: false) {
      id
      name
      stub
      uniqid
      type
      demographic_name
      description
      status
      status_name
      licensed
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
      staff {
        rol
        rol_name
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
  const { slug, lang } = router.query;

  const language = languages[lang];
  const { loading, error, data } = useQuery(FETCH_WORK, {
    variables: { language: language.id, stub: slug }
  });

  if (loading) {
    return (
      <Container>
        <WorkEmpty />
      </Container>
    );
  }
  if (error) {
    logException(JSON.stringify(error), true);
    return <Container id="error_work">Error :(</Container>;
  }

  return (
    <Container>
      <WorkMetatags work={data.work} />
      <div className="row">
        <div className="col-md-4">
          <Cover work={data.work} name={data.work.name} />
        </div>
        <Info work={data.work} />
        <ChapterList work={data.work} />
      </div>
    </Container>
  );
}

const WorkMetatags = React.memo(({ work }) => {
  const router = useRouter();
  const { locale, formatMessage } = useIntl();
  const { lang } = router.query;
  const workThumbnail = getImage(work.thumbnail_path);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="language" content={lang} />
        <title>{work.name + ' :: ' + APP_TITLE}</title>
        <meta property="og:title" content={work.name + ' :: ' + APP_TITLE} />
        <meta property="og:type" content="book" />
        <meta property="og:locale" content={locale}></meta>
        <meta name="description" content={work.description} />
        {work.thumbnail_path !== '' && (
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
          { "@type": "ListItem", "position": 1, "item": { "@id": "${APP_URL}", "name": "${APP_TITLE}" } },
          { "@type": "ListItem", "position": 2, "item": { "@id": "${APP_URL}/work/all", "name": "Works" } },
          { "@type": "ListItem", "position": 2, "item": { "@id": "${APP_URL}${
            router.asPath
          }", "name": "${work.name}" } }
        ]
      },
      "provider": "ReaderFront v${APP_VERSION}",
      "mainEntity": {
        "@type": "ComicSeries",
        "identifier": "urn:uuid:${work.uniqid}",
        "name": "${work.name}",
        "about": "${JSON.stringify(work.description)}",
        "author": [
          ${work.staff
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
          ${work.staff
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
              `"${formatMessage({
                id: g.name,
                defaultMessage: g.name
              })}"`
          )}
        ],
        "copyrightHolder": [],
        ${
          work.thumbnail_path !== '' &&
          `"image": "${workThumbnail}",
          "thumbnailUrl": "${workThumbnail}"`
        }
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
});

export default withApollo(WorkContainer);
