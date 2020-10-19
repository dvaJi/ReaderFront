import { memo } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BottomActionsWrapper } from './styles';
import { Button } from '@components/ui';
import { FETCH_CHAPTERS } from '@components/Read/ReaderControls';

function BottomActions({ chapter }) {
  const router = useRouter();
  const { formatMessage: f } = useIntl();

  const { data } = useQuery(FETCH_CHAPTERS, {
    variables: { workStub: chapter.work.stub, languages: [chapter.language] }
  });

  let prevChapter = null;
  let nextChapter = null;

  if (data && data.chaptersByWork) {
    const chapterList = data.chaptersByWork;
    if (chapterList.length > 1) {
      const currentChapter = chapterList.find(c => c.id === chapter.id);
      const chapterIndex = chapterList.indexOf(currentChapter);

      if (chapterIndex === 0) {
        nextChapter = null;
        prevChapter = chapterList[chapterIndex + 1].read_path;
      } else if (chapterIndex === chapterList.length - 1) {
        nextChapter = chapterList[chapterIndex - 1].read_path;
        prevChapter = null;
      } else {
        nextChapter = chapterList[chapterIndex - 1].read_path;
        prevChapter = chapterList[chapterIndex + 1].read_path;
      }
    }
  }

  const { work } = chapter;
  return (
    <BottomActionsWrapper className="container">
      <Button
        onClick={() => {
          router.push(prevChapter);
        }}
        disabled={!prevChapter}
      >
        <FontAwesomeIcon icon="arrow-left" />
        {f({ id: 'previous', defaultMessage: 'Previous' })}
      </Button>
      <div>
        <Button
          onClick={() => {
            router.push(`/work/${work.language_name}/${work.stub}`);
          }}
        >
          <FontAwesomeIcon icon="home" />
          {f({ id: 'back', defaultMessage: 'Back' })}
        </Button>
        <Button
          onClick={() => {
            window && window.scrollTo(0, 0);
          }}
        >
          <FontAwesomeIcon icon="arrow-up" />
          {f({ id: 'top_of_page', defaultMessage: 'Top of Page' })}
        </Button>
      </div>
      <Button
        onClick={() => {
          router.push(nextChapter);
        }}
        disabled={!nextChapter}
      >
        {f({ id: 'next', defaultMessage: 'Next' })}
        <FontAwesomeIcon icon="arrow-right" className="arrow-right" />
      </Button>
    </BottomActionsWrapper>
  );
}

export default memo(BottomActions);
