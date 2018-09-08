import React, { PureComponent } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

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
    const { chapter, subchapter } = this.props.chapter;
    let url = `${this.props.chapter.download_href}`.replace(
      'https://',
      'http://'
    );
    return (
      <a
        className="Download"
        href={url}
        onClick={e =>
          this.createGAEvent(
            'Chapter Downloaded',
            `${this.props.work.name} - ${chapter}.${subchapter}`
          )
        }
        target="_blank"
      >
        <FontAwesomeIcon icon={faDownload} />
      </a>
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
      <div className="ReaderBar clearfix">
        <div className="float-left title">
          <span className="truncate">{this.workLink()}</span>:{' '}
          <FormattedMessage id="chapter" defaultMessage="Chapter" />{' '}
          {this.props.chapter.chapter}
          {this.downloadChapter()}
        </div>
        <div className="float-right">
          <Button
            text={intl.formatMessage({
              id: 'previous_chapter',
              defaultMessage: 'Previous chapter'
            })}
            gaEvent={this.createGAEvent}
            url={this.chapterUrl(prevChapter)}
            chapter={prevChapter}
          />{' '}
          <Button
            text={intl.formatMessage({
              id: 'next_chapter',
              defaultMessage: 'Next chapter'
            })}
            gaEvent={this.createGAEvent}
            url={this.chapterUrl(nextChapter)}
            chapter={nextChapter}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(ReaderBar);
