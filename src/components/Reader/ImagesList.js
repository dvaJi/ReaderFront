import React, { Component } from "react";
import styled from "styled-components";

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

export default class ImagesList extends Component {
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
        <Image key={page.id} alt={page.filename} src={page.thumb_url} />
      );
    });

    return <ImageList>{rows}</ImageList>;
  }
}
