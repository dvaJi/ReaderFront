import React, { Component } from "react";
import styled from "styled-components";

export default class SerieItemEmpty extends Component {
  render() {
    const Cover = styled.div`
      background-color: #ddd;
      height: 212px;
      width: 150px;
    `;

    return (
      <a>
        <div className="shimme-card card u-clearfix">
          <div className="card-media">
            <Cover className="card-media-img show-loading-animation" />
          </div>
          <div className="card-body">
            <h2 className="card-body-heading shimme-title">
              <div className="shimme-text show-loading-animation">
                {"\u00A0"}
              </div>
            </h2>
            <ul className="card-body-description u-clearfix">
              <div className="shimme-text shimme-desc show-loading-animation">
                {"\u00A0"}
              </div>
              <div className="shimme-text shimme-desc show-loading-animation">
                {"\u00A0"}
              </div>
              <div className="shimme-text shimme-desc show-loading-animation">
                {"\u00A0"}
              </div>
            </ul>
          </div>
        </div>
      </a>
    );
  }
}
