import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useIntl from '@hooks/use-intl';

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

const chapterVolume = (volume, f) =>
  volume !== 0 && (
    <>
      {f({ id: 'vol', defaultMessage: 'Vol. ' })} {volume}
    </>
  );
const chapterNumber = (chapter, subchapter, f) => (
  <>
    {f({ id: 'chapter', defaultMessage: 'Chapter' })} {chapter}
    {subchapter !== 0 ? '.' + subchapter : ''}
  </>
);

const chapterTitle = ({ chapter, subchapter, volume, f }) => {
  if (chapter === undefined || volume === undefined) {
    return '';
  }
  return (
    <>
      {chapterVolume(volume, f)} {chapterNumber(chapter, subchapter, f)}
    </>
  );
};

export default function ReleaseItem({ release }) {
  const { f } = useIntl();
  const thumbnail = getImage(release.thumbnail_path, 600, 350, 1, true);
  const diffString = useDistanceDate(release.createdAt);
  return (
    <div className="col-12 col-md-6 col-xl-3">
      <div className="rounded">
        <Media>
          <Link href={release.read_path} passHref>
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
                    <span className="status">
                      {chapterTitle({ ...release, f })}
                    </span>
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
            <Link href={release.read_path} passHref>
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
