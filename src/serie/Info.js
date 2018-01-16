import React from "react";

export default ({ serie } = this.props) => (
  <div className="Info">
    <div className="Description">
      <h4>Descripción</h4>
      {serie.description}
    </div>
    <div className="Author">
      <h4>Autor</h4>
      {serie.author}
      <h4>Artista</h4>
      {serie.artist}
    </div>
  </div>
);
