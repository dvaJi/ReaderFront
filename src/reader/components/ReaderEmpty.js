import React, { PureComponent } from "react";

export default class ReaderEmpty extends PureComponent {
  render() {
    return (
      <div className="ReaderBar shimme-reader">
        <div className="text-left">
        <div className="shimme-text show-loading-animation">{"\u00A0"}</div>
          <div className="pull-right">
          </div>
        </div>
        <div className="shimme-page show-loading-animation">{"\u00A0"}</div>
      </div>
    );
  }
}
