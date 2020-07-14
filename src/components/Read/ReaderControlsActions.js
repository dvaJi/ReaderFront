import { useIntl } from 'react-intl';
import { UncontrolledTooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReaderControlsActions as Wrapper } from './styles';
import { ANONYMIZER_DOWNLOADS } from 'lib/config';
import { logEvent } from 'lib/analytics';

export default function ReaderControlsActions({
  work,
  chapter,
  toggleShowSettings,
  children
}) {
  const { formatMessage: f } = useIntl();
  return (
    <Wrapper>
      <a
        title="Download chapter"
        id="download-chapter"
        onClick={() => {
          logEvent(
            'Reader',
            'Download Chapter',
            `${work.name} [${work.language_name}] - ${chapter.chapter}.${chapter.subchapter}`
          );
        }}
        href={`${ANONYMIZER_DOWNLOADS + chapter.download_href}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon="download" size="lg" />
      </a>
      <UncontrolledTooltip placement="bottom" target="download-chapter">
        {f({
          id: 'download_chapter',
          defaultMessage: 'Download Chapter'
        })}
      </UncontrolledTooltip>
      <button
        title="Reader settings"
        id="settings-button"
        onClick={() => toggleShowSettings(true)}
      >
        <FontAwesomeIcon icon="cog" size="lg" />
      </button>
      <UncontrolledTooltip placement="bottom" target="settings-button">
        {f({ id: 'reader_settings', defaultMessage: 'Reader Settings' })}
      </UncontrolledTooltip>
      {children}
    </Wrapper>
  );
}
