import React, { PureComponent } from 'react';
import { ListGroup } from 'reactstrap';

import { renderIf, hashCode } from '../../../utils/helpers';
import { getImage } from '../../../common/Image';
import PageItemWithThumb from './PageItemWithThumb';
import PageItem from './PageItem';

class PagesList extends PureComponent {
  constructor(props) {
    super(props);
    this.renderWithThumbnail = this.renderWithThumbnail.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  renderWithThumbnail() {
    const {
      pages,
      chapter,
      defaultPage,
      handleUpload,
      handleSelectDefaultPage,
      handleRemovePage
    } = this.props;
    return (
      <aside id="pages-list">
        {pages.map(f => {
          const filename = f.file !== undefined ? f.file.name : f.filename;
          const isUploading = f.isUploading ? true : false;
          const pageHash = hashCode(filename);
          const thumb =
            f.file !== undefined
              ? f.file
              : getImage(
                  `works/${chapter.work.uniqid}/${chapter.uniqid}/${
                    f.filename
                  }`,
                  230,
                  230
                );
          return (
            <PageItemWithThumb
              index={pageHash}
              key={thumb + filename}
              thumb={thumb}
              isUploaded={f.uploaded}
              isUploading={isUploading}
              isDefaultPage={filename === defaultPage}
              hasError={f.hasError}
              handleUpload={handleUpload}
              handleSelectDefault={handleSelectDefaultPage}
              handleRemovePage={handleRemovePage}
              page={f}
            />
          );
        })}
      </aside>
    );
  }

  renderList() {
    const {
      pages,
      chapter,
      defaultPage,
      handleUpload,
      handleSelectDefaultPage,
      handleRemovePage
    } = this.props;
    return (
      <ListGroup style={{ marginBottom: 25 }}>
        {pages.map(f => {
          const filename = f.file !== undefined ? f.file.name : f.filename;
          const isUploading = f.isUploading ? true : false;
          const pageHash = hashCode(filename);
          const isDefault = filename === defaultPage;
          const thumb = getImage(
            `works/${chapter.work.uniqid}/${chapter.uniqid}/${f.filename}`,
            230,
            230
          );

          return (
            <PageItem
              index={pageHash}
              key={thumb + filename}
              filename={filename}
              thumb={thumb}
              isUploaded={f.uploaded}
              isUploading={isUploading}
              isDefaultPage={isDefault}
              hasError={f.hasError}
              handleUpload={handleUpload}
              handleSelectDefault={handleSelectDefaultPage}
              handleRemovePage={handleRemovePage}
              page={f}
            />
          );
        })}
      </ListGroup>
    );
  }

  render() {
    const { actualView } = this.props;
    const isWithThumbs = actualView === 'thumbnails';
    return (
      renderIf(isWithThumbs, this.renderWithThumbnail) ||
      renderIf(!isWithThumbs, this.renderList)
    );
  }
}

export default PagesList;
