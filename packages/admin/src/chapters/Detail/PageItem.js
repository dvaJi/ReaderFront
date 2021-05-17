import React, { memo } from 'react';
import { useSpring, animated } from 'react-spring';
import { UncontrolledTooltip } from 'reactstrap';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faFileUpload,
  faSpinner,
  faImage
} from '@fortawesome/free-solid-svg-icons';

import { StyledSpinner, PageListItem, PageListItemAction } from '../styles';

const getColor = ({ isUploading, isUploaded, isDefaultPage, hasError }) => {
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
};

function PagesItem({
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
}) {
  const color = getColor({
    isUploading,
    isDefaultPage,
    isUploaded,
    hasError
  });
  const size = page.file !== undefined ? page.file.size : page.size;
  const { formatMessage: f } = useIntl();
  const spinnerSpring = useSpring({
    opacity: isUploading ? 1 : 0,
    display: isUploading ? 'initial' : 'none'
  });
  const setDefaultSpring = useSpring({
    opacity: isUploaded ? 1 : 0,
    display: isUploaded ? 'initial' : 'none'
  });
  const uploadSpring = useSpring({
    opacity: !isUploaded && !isUploading ? 1 : 0,
    display: !isUploaded && !isUploading ? 'initial' : 'none'
  });
  return (
    <PageListItem key={index} color={color}>
      <animated.span style={spinnerSpring}>
        <StyledSpinner icon={faSpinner} />
      </animated.span>
      <animated.span style={setDefaultSpring}>
        <PageListItemAction
          id={'select-default-' + index}
          onClick={() => handleSelectDefault(page)}
        >
          <FontAwesomeIcon icon={faImage} />
        </PageListItemAction>
      </animated.span>
      {!isDefaultPage && isUploaded && !isUploading && (
        <UncontrolledTooltip placement="top" target={'select-default-' + index}>
          {f({
            id: 'select_page_as_default',
            defaultMessage: 'Select page as default'
          })}
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
      {size > 2411724 &&
        f({
          id: 'error_size_limit',
          defaultMessage: 'Error: This file exceeds the maximum upload size'
        })}
      <div className="float-right">
        {!hasError && (
          <animated.span style={uploadSpring}>
            <PageListItemAction onClick={() => handleUpload(page)}>
              <FontAwesomeIcon icon={faFileUpload} />
            </PageListItemAction>
          </animated.span>
        )}
        <PageListItemAction onClick={() => handleRemovePage(page)}>
          <FontAwesomeIcon icon={faTimes} />
        </PageListItemAction>
      </div>
    </PageListItem>
  );
}

export default memo(PagesItem);
