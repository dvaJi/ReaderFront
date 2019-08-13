import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Card } from 'common/ui';
import { slugify, forEachSeries } from 'utils/helpers';
import { uploadImage } from 'utils/common';
import PagesList from './PagesList';
import DetailActions from './DetailActions';
import { WithMutation } from './DropImagesMutation';

class DropImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      pages: props.chapter.pages.map(pag => ({ ...pag, uploaded: true })),
      defaultPage: props.chapter.thumbnail,
      pageView: 'list'
    };
  }

  handleSetPageView = view => {
    this.setState({ pageView: view });
  };

  handleOnDrop = files => {
    const filenames = this.state.pages.map(p => p.filename);
    const nonDuplicates = files.filter(f => !filenames.includes(f.name));
    const newPages = [
      ...this.state.pages,
      ...nonDuplicates.map(f => ({
        filename: f.name,
        file: f,
        uploaded: false,
        isUploading: false,
        hasError: f.size > 2411724
      }))
    ].sort((p1, p2) =>
      slugify(p1.filename).localeCompare(slugify(p2.filename))
    );

    this.setState({
      pages: newPages
    });
  };

  handleUploadFile = async file => {
    const { intl, createPage, chapter } = this.props;
    const { pages } = this.state;

    await this.setState({
      pages: [
        ...pages.filter(p => p.filename !== file.filename),
        { ...file, isUploading: true, hasError: false }
      ].sort((p1, p2) => p1.filename.localeCompare(p2.filename))
    });

    let data = new FormData();
    data.append('file', file.file);

    try {
      const uploadResponse = await uploadImage(data);

      const newPage = {
        chapterId: chapter.id,
        filename: uploadResponse.data.file,
        hidden: false,
        height: 0,
        width: 0,
        size: file.file.size,
        mime: file.file.type,
        file: file.file
      };

      const pageToUpload = Object.assign({}, newPage);
      delete pageToUpload.file;

      try {
        const createResponse = await createPage({
          variables: { ...pageToUpload }
        });
        if (
          createResponse.data.errors &&
          createResponse.data.errors.length > 0
        ) {
          this.setState({ error: createResponse.data.errors[0].message });
        } else {
          const newPages = [
            ...this.state.pages.filter(p => p.filename !== file.filename),
            {
              ...file,
              id: createResponse.data.pageCreate.id,
              uploaded: true,
              isUploading: false,
              hasError: false,
              size: file.file.size,
              file: undefined,
              filename: uploadResponse.data.file
            }
          ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));

          this.setState({ pages: newPages });
          return file;
        }
      } catch (err) {
        console.error(err);
        const newPages = [
          ...this.state.pages.filter(p => p.filename !== file.filename),
          { ...file, isUploading: false, hasError: true }
        ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));

        this.setState({
          error: this.props.intl.formatMessage({
            id: 'unknown_error',
            defaultMessage: 'There was some error. Please try again.'
          }),
          pages: newPages
        });
        return null;
      }
    } catch (err) {
      console.error(err);
      const newPages = [
        ...this.state.pages.filter(p => p.filename !== file.filename),
        { ...file, isUploading: false, hasError: true }
      ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));

      this.setState({
        error: intl.formatMessage({
          id: 'unknown_error',
          defaultMessage: 'There was some error. Please try again.'
        }),
        pages: newPages
      });
      return null;
    }
  };

  handleUploadAll = async () => {
    const { chapter } = this.props;
    const { pages } = this.state;
    const pagesToUpload = pages.filter(
      page => page.file !== undefined && !page.hasError
    );

    if (pagesToUpload.length > 0) {
      await forEachSeries(pagesToUpload, async page => {
        await this.handleUploadFile(page);
      });

      if (
        (chapter.thumbnail === '' || chapter.thumbnail === null) &&
        pages.length > 0
      ) {
        const index = pages.length < 3 ? 0 : 2;
        await this.handleSetDefaultPage(pages[index]);
      }

      this.props.toggleModal(true);
    }
  };

  handleRemoveFile = async page => {
    const id = page.id;
    if (page.uploaded) {
      await this.props.removePage({ variables: { id } });

      if (page.filename === this.props.chapter.thumbnail) {
        await this.props.updateDefaultPage({
          variables: { id: this.props.chapter.id, thumbnail: null }
        });
      }
    }

    const newPagesList = [
      ...this.state.pages.filter(p => p.filename !== page.filename)
    ].sort((p1, p2) => p1.filename.localeCompare(p2.filename));

    await this.setState({
      pages: newPagesList
    });
  };

  handleRemoveAll = async () => {
    await forEachSeries(this.state.pages, async page => {
      await this.handleRemoveFile(page);
    });

    if (
      this.props.chapter.thumbnail !== null ||
      this.props.chapter.thumbnail !== ''
    ) {
      await this.props.updateDefaultPage({
        variables: { id: this.props.chapter.id, thumbnail: null }
      });
    }

    this.setState({ pages: [] });
  };

  handleSetDefaultPage = async file => {
    await this.props.updateDefaultPage({
      variables: { id: this.props.chapter.id, thumbnail: file.filename }
    });

    this.setState({ defaultPage: file.filename });
  };

  render() {
    const { pageView, pages, defaultPage } = this.state;
    const { chapter } = this.props;
    return (
      <>
        <DetailActions
          uploadAll={this.handleUploadAll}
          deleteAll={this.handleRemoveAll}
          changeView={this.handleSetPageView}
          actualView={pageView}
        />
        <Card>
          <Dropzone
            id="dropzone-pages"
            accept="image/jpeg, image/png, image/gif"
            onDrop={this.handleOnDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                style={{
                  background: '#edf0f4',
                  height: 100,
                  textAlign: 'center',
                  borderRadius: 5,
                  margin: 10
                }}
              >
                <input {...getInputProps()} />
                <p style={{ paddingTop: '40px' }}>
                  <FormattedMessage
                    id="drop_or_browse_files"
                    defaultMessage="Drop or Browse images"
                  />
                </p>
              </div>
            )}
          </Dropzone>
          <PagesList
            pages={pages}
            chapter={chapter}
            defaultPage={defaultPage}
            actualView={pageView}
            handleUpload={this.handleUploadFile}
            handleSelectDefaultPage={this.handleSetDefaultPage}
            handleRemovePage={this.handleRemoveFile}
          />
        </Card>
      </>
    );
  }
}

export default injectIntl(WithMutation(DropImages));
