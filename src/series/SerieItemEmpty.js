import React, { Component } from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 65px;
  width: 47%;
  margin-right: 1.5%;
  margin-left: 1.5%;
  display: inline-block;
  cursor: pointer;
  position: relative;
  vertical-align: top;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(10px);
  white-space: normal;
  transition-property: all;
  transition-duration: 250ms;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    box-shadow: 0 40px 40px rgba(0, 0, 0, 0.16);
    transform: translate(0, -10px);
    transition-delay: 0s !important;
  }
`;
const CardBody = styled.div`
  float: left;
  padding: 15px 25px 25px 20px;
  width: 70%;

  @media (max-width: 1200px) {
    width: 60%;
  }

  @media (max-width: 990px) {
    width: 100%;
  }

  .card-body-heading {
    color: #6f6f6f;
    display: inline-block;
    font-size: 22px;
    padding-left: 15%;
    margin-bottom: 15px;

    @media (max-width: 990px) {
      padding-left: 0%;
      padding-right: 40%;
    }
  }

  .card-body-description {
    @media (max-width: 990px) {
      padding-left: 0;
    }
  }
`;
const Cover = styled.div`
  float: left;
  padding: 0 0 25px 25px;
  position: relative;
  width: 145px;

  @media (max-width: 990px) {
    width: 100%;
    height: 180px;
    padding: 0;
  }

  .card-media-img {
    background-color: #ddd;
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
      box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.08);
    }
  }
`;

export default class SerieItemEmpty extends Component {
  render() {
    return (
      <a>
        <Card className="shimme-card">
          <Cover>
            <div className="card-media-img show-loading-animation" />
          </Cover>
          <CardBody>
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
          </CardBody>
        </Card>
      </a>
    );
  }
}
