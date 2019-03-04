import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';
import { languageIdToName } from '../../utils/common';
import { READER_PATH, ANONYMIZER_DOWNLOADS } from '../../config';

const ReaderBarStyle = styled.div`
  min-height: 30px;
  margin-bottom: 15px;
`;

const Title = styled.div`
  font-size: 22px;

  .truncate {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const DownloadIcon = styled.a`
  font-size: 18px;
  margin-left: 10px;
`;

class ReaderBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      chapters: [],
      work: {}
    };
  }

  workLink() {
    let url = `/work/${this.props.work.stub}`;
    return <Link to={url}>{this.props.work.name}</Link>;
  }

  downloadChapter() {
    const { id, chapter, subchapter, pages } = this.props.chapter;
    let url = `${ANONYMIZER_DOWNLOADS + READER_PATH}download/${id}`;
    return pages && pages.length > 0 ? (
      <DownloadIcon
        href={url}
        onClick={e =>
          this.createGAEvent(
            'Chapter Downloaded',
            `${this.props.work.name} - ${chapter}.${subchapter}`
          )
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faDownload} />
      </DownloadIcon>
    ) : (
      ''
    );
  }

  chapterUrl(chapterSelected) {
    const { work, chapters } = this.props;
    if (work.stub === undefined || chapters[chapterSelected] === undefined) {
      return '';
    }
    if (chapterSelected === -1) {
      return `/work/${work.stub}`;
    }

    const chapter = chapters[chapterSelected];

    return `/read/${work.stub}/${languageIdToName(chapter.language)}/${
      chapter.volume
    }/${chapter.chapter}.${chapter.subchapter}`;
  }

  createGAEvent(action, label) {
    ReactGA.event({
      category: 'Reader',
      action: action,
      label: label,
      value: 1
    });
  }

  render() {
    const { nextChapter, prevChapter, intl } = this.props;
    return (
      <ReaderBarStyle className="clearfix">
        <Title className="float-left">
          <span className="truncate">{this.workLink()}</span>:{' '}
          <FormattedMessage id="chapter" defaultMessage="Chapter" />{' '}
          {this.props.chapter.chapter}
          {this.downloadChapter()}
        </Title>
        <div className="float-right">
          <Button
            id="previous_chapter"
            text={intl.formatMessage({
              id: 'previous_chapter',
              defaultMessage: 'Previous chapter'
            })}
            gaEvent={this.createGAEvent}
            url={this.chapterUrl(prevChapter)}
            chapter={prevChapter}
          />{' '}
          <Button
            id="next_chapter"
            text={intl.formatMessage({
              id: 'next_chapter',
              defaultMessage: 'Next chapter'
            })}
            gaEvent={this.createGAEvent}
            url={this.chapterUrl(nextChapter)}
            chapter={nextChapter}
          />
        </div>
      </ReaderBarStyle>
    );
  }
}

export default injectIntl(ReaderBar);
