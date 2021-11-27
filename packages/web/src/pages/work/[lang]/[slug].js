import React from 'react';
import gql from 'graphql-tag';
import { Container } from 'reactstrap';
import Head from "next/head";
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import useIntl from '@hooks/use-intl';

import { getImage } from '@components/Image';
import Cover from '@components/Work/Cover';
import Info from '@components/Work/Info';
import ExtraInfo from '@components/Work/ExtraInfo';
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
        name
        thumbnail_path
        download_href
        read_path
        releaseDate
      }
      staff {
        rol_name
        people {
          name
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
        <div className="col-lg-4 col-md-5 col-xs-12">
          <Cover work={data.work} />
          <ExtraInfo work={data.work} />
        </div>
        <div className="col-lg-8 col-md-7 col-xs-12 text-muted">
          <h4 className="display-5 pl-3">{data.work.name}</h4>
          <Info work={data.work} />
          <ChapterList work={data.work} />
        </div>
      </div>
    </Container>
  );
}

const WorkMetatags = ({ work }) => {
  const router = useRouter();
  const { locale, f } = useIntl();
  const { lang } = router.query;
  const workThumbnail = getImage(work.thumbnail_path);
  return (
    <Head>
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
          { "@type": "ListItem", "position": 2, "item": { "@id": "${APP_URL}${router.asPath
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
                `"${f({
                  id: g.name,
                  defaultMessage: g.name
                })}"`
            )}
        ],
        "copyrightHolder": [],
        ${work.thumbnail_path !== '' &&
          `"image": "${workThumbnail}",
          "thumbnailUrl": "${workThumbnail}"`
          }
      }
  }`}
      </script>
      {work.genres.map(g => (
        <meta property="book:tag" key={g.name} content={f({ id: g.name, defaultMessage: g.name })} />
      ))}
      <meta property="og:image:alt" content={f({ id: 'cover_alt', defaultMessage: 'Cover for {workName}', values: { workName: work.name } })} />
    </Head>
  );
};

export default withApollo(WorkContainer);
