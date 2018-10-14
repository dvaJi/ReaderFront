import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import * as config from '../../config';

class Chapter extends PureComponent {
  render() {
    const { work, chapter, intl } = this.props;
    const dir = `${work.stub}/${this.props.language.name}/${chapter.volume}/${
      chapter.chapter
    }.${chapter.subchapter}`;
    let url = `${config.READER_PATH}download/${chapter.id}`;
    return (
      <li className="clearfix">
        <Link to={`/read/${dir}`} className="Chapter">
          <FormattedMessage id="chapter" defaultMessage="Chapter" />{' '}
          {chapter.chapter}
          {chapter.subchapter !== '0' ? '.' + chapter.subchapter : ''}
          {chapter.name !== '' ? `: ${chapter.name}` : ''}
        </Link>
        <div className="float-right">
          <a
            className="Download"
            href={url}

            target="_blank"
            rel="noopener noreferrer"
            title={intl.formatMessage({
              id: 'download_chapter',
              defaultMessage: 'Download chapter'
            })}
          >
            <FontAwesomeIcon icon={faDownload} />
          </a>
        </div>
      </li>
    );
  }
}

export default injectIntl(Chapter);
