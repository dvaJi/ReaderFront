import React, { Component } from "react";
import { Container } from "reactstrap";
import SerieContainer from "./containers/SerieContainer";
import "./index.css";

class Serie extends Component {
  render() {
    return (
      <div id="Serie">
        <Container>
          <SerieContainer />
        </Container>
      </div>
    );
  }
}

export default Serie;
