import React, { PureComponent } from "react";
import styled from "styled-components";
import Lazyload from "react-lazyload";

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
    let pages = this.props.pages;
    let rows = [];

    window.scrollTo(0, 0);

    if (isLoading) {
      return <div className="shimme-img" />;
    }

    pages.forEach(page => {
      rows.push(
        <Lazyload key={page.id} height={200} once={true} throttle={200}>
          <Image
            src={page.thumb_url}
            alt={page.filename}
            title={page.filename}
          />
        </Lazyload>
      );
    });

    return <ImageList>{rows}</ImageList>;
  }
}
