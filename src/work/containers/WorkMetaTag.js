import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { APP_TITLE } from '../../config';
import { getWorkThumb, genreTypeIdToName } from '../../utils/common';

// TODO: Add genres to metatag

const MetaTag = ({ work, language }) => {
  const workDir = work.stub + '_' + work.uniqid;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{work.name + ' :: ' + APP_TITLE}</title>
        <meta property="og:title" content={work.name + ' :: ' + APP_TITLE} />
        <meta property="og:type" content="book" />
        <meta
          name="description"
          content={
            work.works_descriptions.find(e => e.language === language.id)
              .description
          }
        />
        <meta
          property="og:image"
          content={getWorkThumb(workDir, work.thumbnail, 'medium')}
        />
      </Helmet>
      {work.works_genres.map(g => {
        const genre = genreTypeIdToName(g.genreId);
        return (
          <FormattedMessage id={genre} defaultMessage={genre}>
            {genre => (
              <Helmet>
                <meta property="book:tag" content={genre} />
              </Helmet>
            )}
          </FormattedMessage>
        );
      })}
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

export default MetaTag;
