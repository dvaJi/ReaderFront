import React, { memo } from 'react';
import Link from 'next/link';
import { Spinner } from 'reactstrap';

import { APP_TITLE } from 'lib/config';
import {
  ReaderControlsContainer,
  ReaderControlsWrapper,
  ReaderControlsInfo,
  ReaderControlsActions,
  ReaderControlsLogo,
  ReaderControlsChapterInfo,
  ReaderControlsChapters
} from './styles';

function ReaderLoading() {
  return (
    <>
      <div
        style={{
          opacity: 1,
          visibility: 'visible'
        }}
      >
        <ReaderControlsContainer>
          <ReaderControlsWrapper>
            <ReaderControlsInfo>
              <ReaderControlsLogo>
                <Link href="/">
                  <a>{APP_TITLE}</a>
                </Link>
              </ReaderControlsLogo>
              <ReaderControlsChapterInfo>
                <ReaderControlsChapters></ReaderControlsChapters>
              </ReaderControlsChapterInfo>
            </ReaderControlsInfo>
            <ReaderControlsActions></ReaderControlsActions>
          </ReaderControlsWrapper>
        </ReaderControlsContainer>
      </div>
      <div style={{ paddingTop: 'calc(40vh)', textAlign: 'center' }}>
        <Spinner
          style={{ width: '10rem', height: '10rem' }}
          type="grow"
          color="dark"
        />
      </div>
    </>
  );
}

export default memo(ReaderLoading);
