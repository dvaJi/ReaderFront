import React, { PureComponent } from 'react';
import { Spring } from 'react-spring';
import { UncontrolledTooltip } from 'reactstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faFileUpload,
  faSpinner,
  faImage
} from '@fortawesome/free-solid-svg-icons';

import { StyledSpinner, PageListItem, PageListItemAction } from './styles';

class PagesItem extends PureComponent {
  bytesToSize(bytes, fixed = 0) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === undefined || bytes === 0) return 0;
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(fixed)} ${sizes[i]}`;
  }

  getColor({ isUploading, isUploaded, isDefaultPage, hasError }) {
    if (isDefaultPage) {
      return 'info';
    } else if (isUploading) {
      return 'warning';
    } else if (isUploaded) {
      return 'success';
    } else if (hasError) {
      return 'danger';
    } else {
      return '';
    }
  }

  render() {
    const {
      index,
      thumb,
      filename,
      page,
      isUploaded,
      isUploading,
      isDefaultPage,
      hasError,
      handleRemovePage,
      handleSelectDefault,
      handleUpload
    } = this.props;
    const color = this.getColor({
      isUploading,
      isDefaultPage,
      isUploaded,
      hasError
    });
    const size = page.file !== undefined ? page.file.size : page.size;
    return (
      <PageListItem key={index} color={color}>
        {isUploading && (
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {props => <StyledSpinner style={props} icon={faSpinner} />}
          </Spring>
        )}
        {isUploaded && (
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {props => (
              <PageListItemAction
                id={'select-default-' + index}
                style={props}
                onClick={() => handleSelectDefault(page)}
              >
                <FontAwesomeIcon style={props} icon={faImage} />
              </PageListItemAction>
            )}
          </Spring>
        )}
        {!isDefaultPage &&
          isUploaded &&
          !isUploading && (
            <UncontrolledTooltip
              placement="top"
              target={'select-default-' + index}
            >
              <FormattedMessage
                id="select_page_as_default"
                defaultMessage="Select page as default"
              />
            </UncontrolledTooltip>
          )}
        {'  '}
        {isUploaded ? (
          <a
            href={thumb}
            target="_blank"
            without="true"
            rel="noopener noreferrer"
          >
            {filename}
          </a>
        ) : (
          filename
        )}
        {size > 2411724 && (
          <FormattedMessage
            id="error_size_limit"
            defaultMessage="Error: This file exceeds the maximum upload size"
          />
        )}
        <div className="float-right">
          {!isUploaded &&
            !isUploading && (
              <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {props => (
                  <PageListItemAction
                    style={props}
                    onClick={() => handleUpload(page)}
                  >
                    <FontAwesomeIcon icon={faFileUpload} />
                  </PageListItemAction>
                )}
              </Spring>
            )}
          <PageListItemAction onClick={() => handleRemovePage(page)}>
            <FontAwesomeIcon icon={faTimes} />
          </PageListItemAction>
        </div>
      </PageListItem>
    );
  }
}

export default injectIntl(PagesItem);
