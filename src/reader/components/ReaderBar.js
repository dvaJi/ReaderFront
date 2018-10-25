import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import * as config from '../../config';

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
    let url = `${config.READER_PATH}download/${id}`;
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

  chapterUrl(chapter) {
    if (
      this.props.work.stub === undefined ||
      this.props.chapters[chapter] === undefined
    ) {
      return '';
    }
    if (chapter === -1) {
      return `/work/${this.props.work.stub}`;
    }

    return `/read/${this.props.work.stub}/${
      this.props.chapters[chapter].language
    }/${this.props.chapters[chapter].volume}/${
      this.props.chapters[chapter].chapter
    }.${this.props.chapters[chapter].subchapter}`;
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
