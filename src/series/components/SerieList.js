import React, { PureComponent } from "react";
import SerieItem from "./SerieItem";
import SerieItemEmpty from "./SerieItemEmpty";

export default class SerieList extends PureComponent {
  render() {
    let filterText = this.props.filterText;
    let isLoading = this.props.loading;
    let rows = [];
    let truncate = text => {
      if (text === undefined) {
        return "";
      }
      return text.length > 120 ? text.substr(0, 120 - 1) + "..." : text;
    };

    let redirectTo = serie => {
      return `/serie/${serie.stub}`;
    };

    if (isLoading || (!isLoading && this.props.series.length === 0)) {
      for (let index = 0; index < 15; index++) {
        rows.push(<SerieItemEmpty key={index} serie={{}} />);
      }
    } else {
      this.props.series
        .filter(serie =>
          serie.name.toUpperCase().startsWith(filterText.toUpperCase())
        )
        .forEach(serie => {
          rows.push(
            <SerieItem
              key={serie.id}
              truncate={truncate}
              redirectTo={redirectTo}
              serie={serie}
            />
          );
        });
    }
    return rows;
  }
}
