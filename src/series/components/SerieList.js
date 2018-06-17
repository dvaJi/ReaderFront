import React, { PureComponent } from "react";
import SerieItem from "./SerieItem";
import SerieItemEmpty from "./SerieItemEmpty";
import Lazyload from "react-lazyload";

export default class SerieList extends PureComponent {
  render() {
    let { series, filterText, isLoading } = this.props;
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

    if (isLoading || (!isLoading && series.length === 0)) {
      for (let index = 0; index < 15; index++) {
        rows.push(<SerieItemEmpty key={index} serie={{}} size={"normal"} />);
      }
    } else {
      let mapList = [],
        count = 0;
      series
        .filter(serie =>
          serie.name.toUpperCase().startsWith(filterText.toUpperCase())
        )
        .forEach((serie, index) => {
          const isEven = index % 2 === 0;
          if (isEven) {
            mapList[count] = [
              <SerieItem
                key={serie.id}
                truncate={truncate}
                redirectTo={redirectTo}
                serie={serie}
                size={"normal"}
              />
            ];
          } else {
            mapList[count].push(
              <SerieItem
                key={serie.id}
                truncate={truncate}
                redirectTo={redirectTo}
                serie={serie}
                size={"normal"}
              />
            );
            count++;
          }
        });
      mapList.forEach((serieList, index) => {
        rows.push(
          <Lazyload
            key={index}
            height={220}
            once={true}
            throttle={200}
            offset={100}
          >
            {serieList.map(serie => serie)}
          </Lazyload>
        );
      });
    }
    return rows;
  }
}
