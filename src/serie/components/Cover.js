import React, { PureComponent } from "react";

export default class Cover extends PureComponent {
  render() {
    const { cover, name } = this.props;
    return <img className="Cover" src={cover} alt={name} />;
  }
}
