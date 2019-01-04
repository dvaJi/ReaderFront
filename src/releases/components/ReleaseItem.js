import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from 'date-fns/format';
import { FormattedMessage } from 'react-intl';

export default function ReleaseCategory({ release, url }) {
  // TODO: formatear nombre
  let chapterName = release.chapter;
  if (release.volume !== 0) {
    chapterName = release.volume + ' ' + chapterName;
  }
  if (release.name !== null) {
    chapterName += release.name;
  }
  return (
    <div className="media text-muted pt-3">
      <svg
        className="bd-placeholder-img mr-2 rounded"
        width="35"
        height="35"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        role="img"
        aria-label="Placeholder: 32x32"
      >
        <title>
          <FormattedMessage id="chapter" defaultMessage="Chapter" />{' '}
          {release.chapter}
        </title>
        <rect fill="#ffffff" width="100%" height="100%" />
        <text fill="#424242" text-anchor="middle" dy=".3em" x="50%" y="50%">
          {release.chapter}
        </text>
      </svg>
      <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong className="d-block text-gray-dark">
          <Link to={url}>{chapterName}</Link>
        </strong>
        {formatDate(release.releaseDate, 'DD/MM/YYYY')}
      </p>
    </div>
  );
}
