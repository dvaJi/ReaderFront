import React, { PureComponent } from "react";

export default class Info extends PureComponent {
  render() {
    const { serie } = this.props;
    const description =
      this.props.description !== undefined
        ? this.props.description.description
        : "";
    return (
      <div className="Info col-md-8 col-md-offset-1">
        <div className="Description">
          <h4>Descripción</h4>
          {description}
        </div>
        <div className="Author">
          <h4>Autor</h4>
          {serie.author}
          <h4>Artista</h4>
          {serie.artist}
        </div>
      </div>
    );
  }
}
