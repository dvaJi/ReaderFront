import React, { PureComponent } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faFileUpload,
  faImage,
  faList
} from '@fortawesome/free-solid-svg-icons';

import { DetailActionsBar } from './styles';

class DetailActions extends PureComponent {
  constructor(props) {
    super(props);

    this.handleUploadAll = this.handleUploadAll.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
  }

  handleUploadAll() {
    this.props.uploadAll();
  }

  handleDeleteAll() {
    this.props.deleteAll();
  }

  render() {
    const { actualView, changeView } = this.props;
    return (
      <DetailActionsBar>
        <Button
          id="upload-all-pages"
          type="button"
          onClick={this.handleUploadAll}
        >
          <FontAwesomeIcon icon={faFileUpload} />{' '}
          <FormattedMessage
            id="upload_selected"
            defaultMessage="Upload selected"
          />
        </Button>
        {'  '}
        <Button
          id="delete-all-pages"
          type="button"
          onClick={this.handleDeleteAll}
        >
          <FontAwesomeIcon icon={faTimes} />{' '}
          <FormattedMessage id="delete_all" defaultMessage="Delete all" />
        </Button>
        <ButtonGroup className="float-right">
          <Button
            id="thumbnails-view"
            active={actualView === 'thumbnails'}
            color="primary"
            onClick={() => changeView('thumbnails')}
          >
            <FontAwesomeIcon icon={faImage} />
          </Button>
          <Button
            id="list-view"
            active={actualView === 'list'}
            color="primary"
            onClick={() => changeView('list')}
          >
            <FontAwesomeIcon icon={faList} />
          </Button>
        </ButtonGroup>
      </DetailActionsBar>
    );
  }
}

export default injectIntl(DetailActions);
