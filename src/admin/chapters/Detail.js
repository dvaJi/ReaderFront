import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
  Alert,
  Button,
  CustomInput,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from 'reactstrap';

// App imports
import { renderIf } from '../../utils/helpers';
import { getChapterPageUrl } from '../../utils/common';
import {
  createOrUpdatePage,
  updateDefaultPage,
  removePage
} from '../../releases/actions/doReleases';
import { fetchChapter as getChapter } from '../../reader/actions/doReader';
import { upload } from '../../common/actions';
import Preview from './Preview';
import params from '../../params';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
      showModalDelete: false,
      chapter: {
        workId: parseInt(this.props.match.params.workId, 0),
        chapter: 0,
        subchapter: 0,
        volume: 0,
        language: 1,
        name: '',
        stub: '',
        hidden: false,
        notShowAtStart: false,
        description: '',
        thumbnail: '',
        pages: []
      },
      pages: [],
      languages: Object.keys(params.global.languages).map(
        k => params.global.languages[k]
      )
    };

    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.renderDropzone = this.renderDropzone.bind(this);
    this.setDefaultPage = this.setDefaultPage.bind(this);
    this.removePage = this.removePage.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  componentDidMount() {
    if (
      this.props.chapter == null ||
      this.props.chapter.id !== parseInt(this.props.match.params.chapterId, 0)
    ) {
      this.getChapter(this.props.match.params.chapterId);
    } else {
      this.setState({
        chapter: {
          ...this.props.chapter,
          workId: this.props.match.params.workId
        },
        pages: this.props.chapter.pages.map(pag => {
          return { ...pag, uploaded: true };
        })
      });
    }
  }

  getChapter(chapterId) {
    if (chapterId !== undefined) {
      this.props
        .getChapter(chapterId)
        .then(response => {
          this.setState({
            chapter: {
              ...this.props.chapter,
              workId: this.props.match.params.workId
            },
            pages: this.props.chapter.pages.map(pag => {
              return { ...pag, uploaded: true };
            })
          });
        })
        .catch(error => {
          this.setState({
            error: this.props.intl.formatMessage({
              id: 'error_fetching_chapter',
              defaultMessage:
                'There was some error fetching the chapter. Please try again.'
            })
          });
        });
    }
  }

  async onUpload(file) {
    if (file.file.size <= 2411724) {
      file.isUploading = true;
      file.hasError = false;
      await this.setState({
        isLoading: true,
        pages: [
          ...this.state.pages.filter(p => p.filename !== file.filename),
          file
        ].sort((p1, p2) => p1.filename.localeCompare(p2.filename))
      });

      let data = new FormData();
      data.append('file', file.file);

      // Upload image
      this.props
        .upload(data)
        .then(async response => {
          if (response.status === 200) {
            const newPage = {
              chapterId: this.state.chapter.id,
              filename: response.data.file,
              hidden: false,
              height: 0,
              width: 0,
              size: file.file.size,
              mime: file.file.type,
              file: file.file
            };

            const pageToUpload = Object.assign({}, newPage);
            delete pageToUpload.file;

            this.props
              .createOrUpdatePage(pageToUpload)
              .then(response => {
                this.setState({
                  isLoading: false
                });
                if (response.data.errors && response.data.errors.length > 0) {
                  this.setState({ error: response.data.errors[0].message });
                } else {
                  file.uploaded = true;
                  file.isUploading = false;
                  file.hasError = false;
                  this.setState({
                    chapter: {
                      ...this.state.chapter,
                      pages: [...this.state.pages, newPage]
                    },
                    pages: [
                      ...this.state.pages.filter(
                        p => p.filename !== file.filename
                      ),
                      file
                    ].sort((p1, p2) => p1.filename.localeCompare(p2.filename))
                  });
                }
              })
              .catch(error => {
                file.isUploading = false;
                file.hasError = true;
                this.setState({
                  error: this.props.intl.formatMessage({
                    id: 'unknown_error',
                    defaultMessage: 'There was some error. Please try again.'
                  }),
                  isLoading: false,
                  pages: [
                    ...this.state.pages.filter(
                      p => p.filename !== file.filename
                    ),
                    file
                  ].sort((p1, p2) => p1.filename.localeCompare(p2.filename))
                });
              });
          } else {
            file.isUploading = false;
            file.hasError = true;
            this.setState({
              error: this.props.intl.formatMessage({
                id: 'try_again',
                defaultMessage: 'Please try again.'
              }),
              pages: [
                ...this.state.pages.filter(p => p.filename !== file.filename),
                file
              ].sort((p1, p2) => p1.filename.localeCompare(p2.filename))
            });
          }
        })
        .catch(error => {
          file.isUploading = false;
          file.hasError = true;
          this.setState({
            error: this.props.intl.formatMessage({
              id: 'unknown_error',
              defaultMessage: 'There was some error. Please try again.'
            }),
            pages: [
              ...this.state.pages.filter(p => p.filename !== file.filename),
              file
            ].sort((p1, p2) => p1.filename.localeCompare(p2.filename))
          });
        });
    }
  }

  async uploadSelected() {
    for (const page of this.state.pages) {
      await this.onUpload(page);
    }
  }

  onDrop(files) {
    this.setState({
      pages: [
        ...this.state.pages,
        ...files.map(f => ({
          filename: f.name,
          file: f,
          uploaded: false,
          isUploading: false,
          hasError: f.size > 2411724
        }))
      ].sort((p1, p2) => p1.filename.localeCompare(p2.filename))
    });
  }

  async removePage(page) {
    const id = page.id;
    if (page.uploaded) {
      await this.props.removePage({ id });
    }

    const newPagesList = [
      ...this.state.pages.filter(p => p.filename !== page.filename)
    ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));

    await this.setState({
      pages: newPagesList
    });
  }

  toggleModalDelete() {
    this.setState({
      showModalDelete: !this.state.showModalDelete
    });
  }

  async removeAllPages() {
    await this.setState({
      showModalDelete: false
    });

    for (const page of this.state.pages) {
      await this.removePage(page);
    }

    this.setState({
      chapter: { ...this.state.chapter, thumbnail: '' },
      pages: []
    });
  }

  async setDefaultPage(page) {
    const thumb = await {
      id: parseInt(this.props.match.params.chapterId, 0),
      thumbnail: page.filename
    };
    await this.props.updateDefaultPage(thumb);

    this.setState({
      chapter: {
        ...this.state.chapter,
        thumbnail: page.filename
      }
    });
  }

  renderDropzone() {
    return (
      <div>
        <Button
          id="upload-all-pages"
          type="button"
          onClick={e => this.uploadSelected()}
        >
          <FormattedMessage
            id="upload_selected"
            defaultMessage="Upload selected"
          />
        </Button>
        {'  '}
        <Button
          id="delete-all-pages"
          type="button"
          onClick={this.toggleModalDelete}
        >
          <FormattedMessage id="delete_all" defaultMessage="Delete all" />
        </Button>
        <Dropzone
          accept="image/jpeg, image/png"
          onDrop={this.onDrop.bind(this)}
          style={{
            background: '#edf0f4',
            height: '100px',
            textAlign: 'center',
            borderRadius: '5px'
          }}
        >
          <p style={{ paddingTop: '40px' }}>
            <FormattedMessage
              id="drop_or_browse_files"
              defaultMessage="Drop or Browse images"
            />
          </p>
        </Dropzone>
        <aside id="pages-list">
          {this.state.pages.map((f, index) => {
            const filename = f.file !== undefined ? f.file.name : f.filename;
            const isUploading = f.isUploading ? true : false;
            const thumb =
              f.file !== undefined
                ? f.file.preview
                : getChapterPageUrl(
                    this.props.chapter.work,
                    this.props.chapter,
                    f.filename
                  );
            return (
              <Preview
                index={index}
                key={thumb}
                thumb={thumb}
                isUploaded={f.uploaded}
                isUploading={isUploading}
                isDefaultPage={filename === this.state.chapter.thumbnail}
                hasError={f.hasError}
                handleUpload={this.onUpload}
                handleSelectDefault={this.setDefaultPage}
                handleRemovePage={this.removePage}
                page={f}
              />
            );
          })}
        </aside>
      </div>
    );
  }

  render() {
    const langName = this.state.languages.find(
      l => l.id === this.state.chapter.language
    ).name;
    return (
      <div className="container">
        <div>
          {this.state.error && (
            <Alert id="error-alert" color="danger">
              {this.state.error}
            </Alert>
          )}
          <Link
            to={
              '/admincp/work/' +
              this.props.match.params.workId +
              '/' +
              this.props.match.params.stub
            }
          >
            <Button>
              <FormattedMessage id="go_back" defaultMessage="Go back" />
            </Button>
          </Link>

          <h4>
            <FormattedMessage
              id="manage_chapter"
              defaultMessage="Manage chapter"
            />
          </h4>

          <Card>
            <CardBody>
              <CardTitle>
                <FormattedMessage id="volume" defaultMessage="Volume" />{' '}
                {this.state.chapter.volume}{' '}
                <FormattedMessage id="chapter" defaultMessage="Chapter" />{' '}
                {this.state.chapter.chapter}.{this.state.chapter.subchapter}
                <span className="float-right">
                  <FormattedMessage
                    id={langName + '_full'}
                    defaultMessage={langName}
                  />
                </span>
              </CardTitle>
              <CardSubtitle>{this.state.chapter.name}</CardSubtitle>
            </CardBody>
            <CardBody>
              <Row>
                <Col md="9">
                  <span style={{ fontWeight: '100' }}>
                    {this.state.chapter.description}
                  </span>
                  <FormGroup check>
                    <CustomInput
                      type="checkbox"
                      id="hidden"
                      disabled
                      label={this.props.intl.formatMessage({
                        id: 'hidden',
                        defaultMessage: 'Hidden'
                      })}
                      value={this.state.chapter.hidden}
                    />
                    <CustomInput
                      type="checkbox"
                      id="notShowAtStart"
                      disabled
                      label={this.props.intl.formatMessage({
                        id: 'not_show_at_start',
                        defaultMessage: 'Not show at start (Home and Releases)'
                      })}
                      value={this.state.chapter.notShowAtStart}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <h6 style={{ fontWeight: '100', textAlign: 'right' }}>
                    <FormattedMessage
                      id="thumbnail"
                      defaultMessage="Thumbnail"
                    />
                  </h6>
                  <div style={{ textAlign: 'right' }}>
                    {this.state.chapter.work ? (
                      <img
                        style={{ height: '150px' }}
                        alt={this.state.chapter.thumbnail}
                        src={getChapterPageUrl(
                          this.state.chapter.work,
                          this.state.chapter,
                          'small_thumb_' + this.state.chapter.thumbnail
                        )}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
        <Modal
          isOpen={this.state.showModalDelete}
          toggle={this.toggleModalDelete}
          backdrop={'static'}
        >
          <ModalHeader toggle={this.showModalDelete}>
            <FormattedMessage id="confirm_title" defaultMessage="Confirm" />
          </ModalHeader>
          <ModalBody>
            <FormattedMessage
              id="confirm_delete_pages"
              defaultMessage="Are you sure? All pages in this chapter will be deleted."
            />
          </ModalBody>
          <ModalFooter>
            <Button
              id="confirm-delete-all-pages"
              color="primary"
              onClick={e => this.removeAllPages()}
            >
              <FormattedMessage id="agree" defaultMessage="Agree" />
            </Button>{' '}
            <Button
              id="cancel-delete-all-pages"
              color="secondary"
              onClick={this.toggleModalDelete}
            >
              <FormattedMessage id="cancel" defaultMessage="Cancel" />
            </Button>
          </ModalFooter>
        </Modal>
        <div>
          {renderIf(
            this.props.match.params.chapterId !== undefined,
            this.renderDropzone
          )}
        </div>
      </div>
    );
  }
}

function CreateOrEditState(state, ownProps) {
  return {
    chapter: state.reader.chapter,
    match: state.match || ownProps.match
  };
}

export default injectIntl(
  withRouter(
    connect(
      CreateOrEditState,
      {
        createOrUpdatePage,
        updateDefaultPage,
        removePage,
        getChapter,
        upload
      }
    )(Detail)
  )
);
