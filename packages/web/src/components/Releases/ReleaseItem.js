import React from 'react';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  LastUpdate,
  ListBody,
  ListContent,
  ListTitle,
  Badge,
  Media,
  MediaContent,
  MediaOverlay
} from './styles';
import Flag from '@components/Flag';
import { getImage } from '@components/Image';

import { useDistanceDate } from '@hooks/useDistanceDate';

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

const chapterTitle = ({ chapter, subchapter, volume }) => {
  if (chapter === undefined || volume === undefined) {
    return '';
  }
  return (
    <>
      {chapterVolume(volume)} {chapterNumber(chapter, subchapter)}
    </>
  );
};

export default function ReleaseItem({ release }) {
  const thumbnail = getImage(release.thumbnail_path, 600, 350, 1, true);
  const diffString = useDistanceDate(release.createdAt);
  return (
    <div className="col-12 col-md-6 col-xl-3">
      <div className="rounded">
        <Media>
          <Link href={release.read_path}>
            <MediaContent
              style={{
                backgroundImage: `url('${thumbnail}')`
              }}
            />
          </Link>
          <MediaOverlay top className="justify-content-end">
            {release.work.adult && (
              <Badge className="badge text-uppercase">
                <span className="status">+18</span>
              </Badge>
            )}
          </MediaOverlay>
          <MediaOverlay bottom className=" d-flex justify-content-between">
            {release.read_path && (
              <Link href={release.read_path}>
                <a tabIndex={0}>
                  <Badge className="badge text-uppercase">
                    <span className="status">{chapterTitle(release)}</span>
                  </Badge>
                </a>
              </Link>
            )}
            {release.language_name && (
              <Badge className="badge text-uppercase">
                <Flag language={release.language_name} />
              </Badge>
            )}
          </MediaOverlay>
        </Media>
        <ListContent>
          <ListBody>
            <Link href={release.read_path}>
              <ListTitle>{release.work.name}</ListTitle>
            </Link>
          </ListBody>
          <div className="list-footer">
            <LastUpdate className="text-muted">
              <FontAwesomeIcon icon="clock" className="mr-1" /> {diffString}
            </LastUpdate>
          </div>
        </ListContent>
      </div>
    </div>
  );
}
