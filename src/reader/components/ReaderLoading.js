import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import { APP_TITLE } from '../../config';
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
                <Link to="/">{APP_TITLE}</Link>
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
