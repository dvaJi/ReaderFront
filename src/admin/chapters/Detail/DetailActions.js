import React, { memo } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faFileUpload,
  faImage,
  faList
} from '@fortawesome/free-solid-svg-icons';

import { Button, ButtonGroup } from 'common/ui';
import { DetailActionsBar } from '../styles';

function DetailActions({
  actualView,
  changeView,
  uploadAll,
  deleteAll,
  isUploading = false,
  pages = []
}) {
  const pagesToupload = pages.filter(p => !p.uploaded);
  return (
    <DetailActionsBar>
      <Button
        id="upload-all-pages"
        type="button"
        onClick={uploadAll}
        disabled={isUploading || pagesToupload.length === 0}
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
        onClick={deleteAll}
        disabled={isUploading || pages.length === 0}
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

export default memo(injectIntl(DetailActions));
