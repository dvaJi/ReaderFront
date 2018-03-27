import React, { Component } from "react";

export default class Cover extends Component {
  render() {
    const { cover, name } = this.props;
    return <img className="Cover" src={cover} alt={name} />;
  }
}
