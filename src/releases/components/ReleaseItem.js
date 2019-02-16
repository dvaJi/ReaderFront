import React from 'react';
import formatDate from 'date-fns/format';
import { FormattedMessage } from 'react-intl';

import { ReleaseRow } from './styles';

const chapterVolume = volume =>
  volume !== 0 && (
    <>
      <FormattedMessage id="vol" defaultMessage="Vol. " /> {volume}
    </>
  );
const chapterNumber = (chapter, subchapter) => (
  <>
    <FormattedMessage id="chapter" defaultMessage="Chapter" /> {chapter}
    {subchapter !== 0 ? '.' + subchapter : ''}
  </>
);

const chapterName = name => (name ? ': ' + name : '');

const chapterTitle = ({ name, chapter, subchapter, volume }) => (
  <>
    {chapterVolume(volume)} {chapterNumber(chapter, subchapter)}
    {chapterName(name)}
  </>
);

export default function ReleaseItem({ release, url }) {
  return (
    <ReleaseRow to={url}>
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
          <text fill="#424242" textAnchor="middle" dy=".3em" x="50%" y="50%">
            {release.chapter}
          </text>
        </svg>
        <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <strong className="d-block text-gray-dark">
            {chapterTitle(release)}
          </strong>
          {formatDate(release.releaseDate, 'DD/MM/YYYY')}
        </p>
      </div>
    </ReleaseRow>
  );
}
