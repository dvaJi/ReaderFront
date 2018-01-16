import React from "react";
import { Link } from "react-router-dom";
import SerieCover from "./SerieCover";

export default ({ serie, truncate, redirectTo } = this.props) => (
  <Link to={redirectTo(serie)}>
    <div className="card u-clearfix">
      <SerieCover cover={serie.thumb2} name={serie.name} />
      <div className="card-body">
        <h2 className="card-body-heading">{serie.name}</h2>
        <ul className="card-body-description u-clearfix">
          {truncate(serie.description)}
        </ul>
      </div>
    </div>
  </Link>
);
