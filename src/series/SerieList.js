import React, { Component } from "react";
import SerieItem from "./SerieItem";
import SerieItemEmpty from "./SerieItemEmpty";

export default class SerieList extends Component {
  render() {
    let filterText = this.props.filterText;
    let isLoading = this.props.loading;
    let rows = [];
    let truncate = text => {
      return text.length > 120 ? text.substr(0, 120 - 1) + "..." : text;
    };

    let redirectTo = serie => {
      return `serie/${serie.stub}`;
    };

    this.props.series.forEach(serie => {
      if (isLoading) {
        rows.push(<SerieItemEmpty key={serie.id} serie={serie} />);
      } else {
        if (serie.name.toUpperCase().indexOf(filterText.toUpperCase()) === -1) {
          return;
        }
        rows.push(
          <SerieItem
            key={serie.id}
            truncate={truncate}
            redirectTo={redirectTo}
            serie={serie}
          />
        );
      }
    });
    return rows;
  }
}
