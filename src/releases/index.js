import React, { Component } from "react";
import { Container } from "reactstrap";
import ReleasesContainer from "./containers/ReleasesContainer";

class Releases extends Component {
  render() {
    return (
      <div id="releases">
        <Container>
          <ReleasesContainer />
        </Container>
      </div>
    );
  }
}

export default Releases;
