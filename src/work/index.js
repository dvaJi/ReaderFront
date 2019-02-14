import React, { Component } from "react";
import { Container } from "reactstrap";

import WorkContainer from "./containers/WorkContainer";
import ErrorBoundary from '../utils/ErrorBoundary';

class Work extends Component {
  render() {
    return (
      <div id="Work">
        <ErrorBoundary>
          <Container>
            <WorkContainer match={this.props.match} />
          </Container>
        </ErrorBoundary>
      </div>
    );
  }
}

export default Work;
