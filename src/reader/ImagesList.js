import React, { Component } from "react";

export default class ImagesList extends Component {
  constructor(props) {
    super(props);
    this.handlePageSelectedChange = this.handlePageSelectedChange.bind(this);
  }

  handlePageSelectedChange(e) {
    this.props.onPageSelected(this.props.pageSelected + 1);
  }

  render() {
    let cascade = this.props.cascade;
    let pageSelected = this.props.pageSelected;
    let isLoading = this.props.loading;
    let pages = this.props.pages;
    let rows = [];

    window.scrollTo(0, 0);

    if (isLoading) {
      return <div className="shimme-img" />;
    }

    if (cascade) {
      pages.forEach(page => {
        rows.push(
          <img key={page.id} alt={page.filename} src={page.thumb_url} />
        );
      });
    } else {
      if (pages[pageSelected] !== undefined) {
        return (
          <img
            onClick={this.handlePageSelectedChange}
            alt={pages[pageSelected].filename}
            src={pages[pageSelected].thumb_url}
          />
        );
      } else {
        // debería redireccionar a otro capítulo o simplemente terminar.
      }
    }

    return rows;
  }
}
