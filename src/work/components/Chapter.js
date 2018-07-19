import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

class Chapter extends PureComponent {
  render() {
    const { work, chapter } = this.props;
    const dir = `${work.stub}/${chapter.language}/${chapter.volume}/${
      chapter.chapter
    }.${chapter.subchapter}`;
    return (
      <li className="clearfix">
        <Link to={`/read/${dir}`} className="Chapter">
          {this.context.t('Capítulo')} {chapter.chapter}
          {chapter.subchapter !== '0' ? '.' + chapter.subchapter : ''}
          {chapter.name !== '' ? `: ${chapter.name}` : ''}
        </Link>
        <div className="float-right">
          <a
            className="Download"
            href={`/download/${dir}`}
            target="_blank"
            title={this.context.t('Descargar capítulo')}
          >
            <FontAwesomeIcon icon={faDownload} />
          </a>
        </div>
      </li>
    );
  }
}

Chapter.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Chapter;
