import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Col, UncontrolledTooltip } from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faFileUpload,
  faSpinner,
  faImage
} from '@fortawesome/free-solid-svg-icons';

const RoundedButton = styled.div`
  display: block;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  float: right;
  margin-right: 10px;
  transition: 0.25s ease;
  opacity: 0.8;
  ${props =>
    props.isActive ? 'border: 2px solid rgba(255, 255, 255, 0.8);' : ''} svg {
    vertical-align: middle;
    width: 20px;
    font-size: 0.8em;
  }

  &:hover {
    border: 2px solid rgba(255, 255, 255, 0.8);
    opacity: 1;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  color: #fff;
  height: 70px;
  transition: all 0.2s ease;
  background: ${props =>
    props.isuploaded
      ? 'linear-gradient(to bottom,rgba(54, 151, 99, 0.95) 0%,rgba(54, 151, 99, 0) 100%)'
      : 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)'};
  overflow: hidden;
  padding-top: 10px;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
  ${props =>
    props.hasError
      ? 'background: linear-gradient(to bottom, rgba(255,0,0,0.65) 0%,rgba(255,0,0,0) 100%);'
      : ''};
`;

const OverlaySelectDefault = styled.div`
  opacity: ${props => (props.isActive ? '1' : '0')};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  height: 100%;
  transition: all 0.2s ease;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0.09) 100%
  );
  overflow: hidden;
  padding-top: 10px;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);

  ${RoundedButton} {
    margin: 0 auto;
    margin-top: 80px;
    vertical-align: middle;
    width: 60px;
    height: 60px;

    svg {
      vertical-align: middle;
      margin-top: 11px;
      font-size: 2em;
    }
  }
`;

const Card = styled.div`
  color: #4b4f56;
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 220px;
  background-color: white;
  vertical-align: top;
  text-align: left;
  height: 240px;
  margin: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
  white-space: normal;
  transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
  overflow: hidden;

  &:hover {
    ${OverlaySelectDefault} {
      opacity: 1;
    }

    ${CardOverlay} {
      height: 80px;
      background: ${props =>
        props.isuploaded
          ? 'linear-gradient(to bottom,rgba(54, 151, 99, 1) 0%,rgba(54, 151, 99, 0) 100%)'
          : 'linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%)'};
      ${props =>
        props.hasError
          ? 'background: linear-gradient(to bottom, rgba(255,0,0,0.9) 0%,rgba(255,0,0,0) 100%);'
          : ''};
    }
  }
`;

const CardHero = styled.div`
  background-image: url('${props => props.thumb}');
  background-color: white;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  position: relative;
  clear: both;
  float: left;
  overflow: auto;
  width: 100%;
  height: 245px;
  padding: 20px;
  border-radius: 4px;
`;

const CardOverlayInfo = styled(Col)`
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.9);

  .main {
    display: block;
    font-size: 0.75em;
    font-weight: 500;
    line-height: 1.2;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
  .sub {
    margin-left: 12px;
    display: block;
    font-size: 0.625em;
    opacity: 0.9;
    transition: opacity 0.25s ease-in-out;
    text-align: left;
    white-space: nowrap;
  }
`;

const CardOverlayStatus = styled(Col)``;

const CardOverlayMessage = styled.div`
  margin: 0 auto;
  font-size: 0.7em;
  width: 80%;
  text-shadow: 0px 1px 8px rgba(0, 0, 0, 0.8);
`;

const StyledSpinner = styled(FontAwesomeIcon)`
  animation: rotate 2s linear infinite;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

class Preview extends Component {
  bytesToSize(bytes, fixed = 0) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === undefined || bytes === 0) return 0;
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(fixed)} ${sizes[i]}`;
  }

  render() {
    const {
      index,
      thumb,
      isUploaded,
      isUploading,
      isDefaultPage,
      hasError,
      page,
      handleRemovePage,
      handleSelectDefault,
      handleUpload,
      intl
    } = this.props;
    const size = page.file !== undefined ? page.file.size : page.size;
    return (
      <Card
        id={'page-preview-' + index}
        isuploaded={isUploaded}
        hasError={hasError}
      >
        <CardHero thumb={thumb}>
          {!isDefaultPage &&
            isUploaded &&
            !isUploading && (
              <OverlaySelectDefault className="row">
                <RoundedButton
                  id={'select-default-' + index}
                  onClick={e => handleSelectDefault(page)}
                >
                  <FontAwesomeIcon icon={faImage} size="6x" />
                </RoundedButton>
              </OverlaySelectDefault>
            )}
          {isDefaultPage && (
            <OverlaySelectDefault isActive={true} className="row">
              <RoundedButton isActive={true}>
                {isUploading ? (
                  <StyledSpinner icon={faSpinner} size="xs" />
                ) : (
                  <FontAwesomeIcon icon={faImage} size="6x" />
                )}
              </RoundedButton>
            </OverlaySelectDefault>
          )}
          <CardOverlay
            className="row"
            isuploaded={isUploaded}
            hasError={hasError}
          >
            <CardOverlayInfo>
              <span className="main">{page.filename}</span>
              <span className="sub">{this.bytesToSize(size)}</span>
            </CardOverlayInfo>
            <CardOverlayStatus>
              <RoundedButton
                title={intl.formatMessage({
                  id: 'delete_page',
                  defaultMessage: 'Delete page'
                })}
                onClick={e => handleRemovePage(page)}
              >
                <FontAwesomeIcon icon={faTimes} size="xs" />
              </RoundedButton>
              {!isUploaded &&
                isUploading && (
                  <RoundedButton>
                    <StyledSpinner icon={faSpinner} size="xs" />
                  </RoundedButton>
                )}
              {!isUploaded &&
                !isUploading &&
                size <= 2411724 && (
                  <RoundedButton
                    title={intl.formatMessage({
                      id: 'upload_page',
                      defaultMessage: 'Upload page'
                    })}
                    onClick={e => handleUpload(page)}
                  >
                    <FontAwesomeIcon icon={faFileUpload} size="xs" />
                  </RoundedButton>
                )}
            </CardOverlayStatus>
            <CardOverlayMessage>
              {size > 2411724 ? (
                <FormattedMessage
                  id="error_size_limit"
                  defaultMessage="Error: This file exceeds the maximum upload size"
                />
              ) : (
                ''
              )}
            </CardOverlayMessage>
          </CardOverlay>
        </CardHero>
        {!isDefaultPage &&
          isUploaded &&
          !isUploading && (
            <UncontrolledTooltip
              placement="bottom"
              target={'select-default-' + index}
            >
              <FormattedMessage
                id="select_page_as_default"
                defaultMessage="Select page as default"
              />
            </UncontrolledTooltip>
          )}
      </Card>
    );
  }
}

export default injectIntl(Preview);
