import React, { Component } from "react";

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
      rows.push(<img key={page.id} alt={page.filename} src={page.thumb_url} />);
    });

    return rows;
  }
}
