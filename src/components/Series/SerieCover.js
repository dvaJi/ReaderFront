import React, { Component } from "react";
import styled from "styled-components";

const CardMedia = styled.div`
  float: left;
  padding: 0 0 25px 25px;
  position: relative;
  width: 145px;

  @media (max-width: 990px) {
    width: 100%;
    height: 180px;
    padding: 0;
  }
`;

export default class SerieCover extends Component {
  render() {
    const coverUrl = this.props.cover
      ? this.props.cover
      : "/static/images/default-cover.png";
    const Cover = styled.div`
      background-image: url(${coverUrl});
      background-position: 50% 50%;
      background-size: cover;
      height: 212px;
      width: 150px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
      float: left;
      margin-top: -25px;
      position: relative;
      border-radius: 2px;

      @media (max-width: 990px) {
        width: 100%;
        height: 100%;
        margin-top: 0;
        border-radius: 2px 2px 0px 0px;
        box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.02);
      }
    `;
    return (
      <CardMedia>
        <Cover />
        {/*<span className="card-media-tag card-media-tag-orange">En Curso</span>*/}
      </CardMedia>
    );
  }
}
