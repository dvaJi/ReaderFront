import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Button as RButton } from "reactstrap";

export default class Button extends PureComponent {
  render() {
    return (
      <RButton
        tag={Link}
        color="primary"
        to={this.props.url}
        disabled={this.props.chapter === -1}
      >
        {this.props.text}
      </RButton>
    );
  }
}
