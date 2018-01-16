import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class Button extends Component {

  render() {
    const Button = styled(Link)`
    margin-right: 5px;
    ${this.props.chapter === -1 && "cursor: not-allowed; filter: alpha(opacity=65); box-shadow: none; opacity: .65;"}
    `;

    return (
      <Button
      className="btn btn-default"
      to={this.props.url}
      role="button"
    >
      {this.props.text}
    </Button>
    );
  }
}
