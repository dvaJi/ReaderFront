import React, { PureComponent } from "react";
import styled from "styled-components";
import Card from "../../series/components/SerieItem";
import CardLoading from "../../series/components/SerieItemEmpty";

const SeriesList = styled.div`
  margin-top: 30px;
`;
export default class LatestSerie extends PureComponent {
  truncate = text => {
    if (text === undefined) {
      return "";
    }
    return text.length > 120 ? text.substr(0, 120 - 1) + "..." : text;
  };

  redirectTo = serie => {
    return `/serie/${serie.stub}`;
  };

  render() {
    return (
      <div className="LatestSeries mb-4">
        <h3>{this.props.title}</h3>
        <SeriesList>
          {!this.props.isLoading
            ? this.props.series.map(serie => (
                <Card
                  key={serie.id}
                  truncate={this.truncate}
                  redirectTo={this.redirectTo}
                  serie={serie}
                  size={"small"}
                />
              ))
            : Array.from(new Array(4)).map((fk, index) => (
                <CardLoading key={index} serie={{}} size={"small"} />
              ))}
        </SeriesList>
      </div>
    );
  }
}
