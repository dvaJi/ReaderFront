import React, { Component } from "react";
import { Container } from "reactstrap";

import ReaderContainer from "./containers/ReaderContainer";
import ErrorBoundary from '../utils/ErrorBoundary';

class Reader extends Component {
  render() {
    return (
      <div id="reader">
        <ErrorBoundary>
          <Container>
            <ReaderContainer match={this.props.match} />
          </Container>
        </ErrorBoundary>
      </div>
    );
  }
}

export default Reader;
