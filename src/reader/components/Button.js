import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Button as RButton } from "reactstrap";

export default class Button extends PureComponent {
  render() {
    return (
      <RButton
        tag={Link}
        color="primary"
        onClick={e =>
          this.props.gaEvent(`Press ${this.props.text}`, this.props.url)
        }
        to={this.props.url}
        disabled={this.props.chapter === -1}
      >
        {this.props.text}
      </RButton>
    );
  }
}
