import React from "react";

import ReaderContainer from "./containers/ReaderContainer";

function Reader() {
  return <ReaderContainer match={this.props.match} history={this.props.history}/>;
}

export default Reader;
