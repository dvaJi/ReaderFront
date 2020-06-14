import React from 'react';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import {
  ReleaseRow,
  ReleaseContent,
  ReleaseChapterBlock,
  FlagWrapper
} from './styles';
import Flag from '@components/Flag';

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
    <Link href="/read/[slug]/[lang]/[volume]/[chapter]" as={url}>
      <ReleaseRow>
        <div className="media text-muted pt-3">
          <ReleaseChapterBlock className="mr-2 rounded">
            <FlagWrapper>
              <Flag language={release.language_name} show={true} />
            </FlagWrapper>
          </ReleaseChapterBlock>
          <ReleaseContent className="media-body pb-3 mb-0 small lh-125">
            <strong className="d-block">{chapterTitle(release)}</strong>
            {release.releaseDate_formatted}
          </ReleaseContent>
        </div>
      </ReleaseRow>
    </Link>
  );
}
