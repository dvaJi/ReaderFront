import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Info extends PureComponent {
  render() {
    const { serie } = this.props;
    const description =
      this.props.description !== undefined
        ? this.props.description.description
        : "";
    return (
      <div className="Info col-md-8 col-md-offset-1">
        <div className="Description">
          <h4>{this.context.t("Descripción")}</h4>
          {description}
        </div>
        <div className="Author">
          <h4>{this.context.t("Guión")}</h4>
          {serie.author}
          <h4>{this.context.t("Artista")}</h4>
          {serie.artist}
        </div>
      </div>
    );
  }
}

Info.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Info;
