import React, { Component } from "react";
import { Container } from "reactstrap";
import SeriesContainer from "./containers/WorksContainer";

class Series extends Component {
  render() {
    return (
      <div id="series">
        <Container>
          <SeriesContainer />
        </Container>
      </div>
    );
  }
}

export default Series;
