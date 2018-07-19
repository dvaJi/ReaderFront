import React, { Component } from "react";
import { Container } from "reactstrap";
import WorkContainer from "./containers/WorkContainer";
import "./index.css";

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
