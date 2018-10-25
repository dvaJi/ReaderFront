import React, { Component } from "react";
import { Container } from "reactstrap";
import WorkContainer from "./containers/WorkContainer";

class Work extends Component {
  render() {
    return (
      <div id="Work">
        <Container>
          <WorkContainer />
        </Container>
      </div>
    );
  }
}

export default Work;
