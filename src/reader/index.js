import React, { Component } from "react";

import ReaderContainer from "./containers/ReaderContainer";

class Reader extends Component {
  render() {
    return <ReaderContainer match={this.props.match} />;
  }
}

export default Reader;
