import React, { PureComponent } from "react";
import styled from "styled-components";
import Lazyload from "react-lazyload";
import {getChapterPageUrl} from "../../utils/common"

const ImageList = styled.div`
  text-align: center;
`;
const Image = styled.img`
  display: block;
  vertical-align: middle;
  margin: 0% auto;
  max-width: 100%;
  margin-bottom: 10px;
`;

export default class ImagesList extends PureComponent {
  render() {
    let isLoading = this.props.loading;
    let chapter = this.props.chapter;
    let pages = this.props.pages;
    let rows = [];

    window.scrollTo(0, 0);

    if (isLoading) {
      return <div className="shimme-img" />;
    }

    pages.forEach(page => {
      rows.push(
        <Lazyload
          key={page.id}
          height={page.height / 2}
          once={true}
          throttle={200}
          offset={page.height / 2}
        >
          <Image
            src={getChapterPageUrl(chapter.work, chapter, page.filename)}
            alt={page.filename}
            title={page.filename}
          />
        </Lazyload>
      );
    });

    return <ImageList>{rows}</ImageList>;
  }
}
