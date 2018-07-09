import React, { PureComponent } from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 65px;
  width: 47%;
  margin-right: 1.5%;
  margin-left: 1.5%;
  display: inline-block;
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
`;
const CardBody = styled.div`
  float: left;
  padding: 15px 25px 25px 20px;
  width: ${props => (props.size === "small" ? "100%" : "70%")};

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
    ${props =>
      props.size === "small"
        ? "padding-left: 0;font-size: 0.9rem;color: #8a8e94;"
        : ""} @media (max-width: 990px) {
      padding-left: 0;
      font-size: 0.9rem;
      color: #8a8e94;
    }
  }
`;
const Cover = styled.div`
  float: left;
  padding: ${props => (props.size === "small" ? "0" : "0 0 25px 25px")};
  position: relative;
  width: ${props => (props.size === "small" ? "100%" : "145px")};
  ${props =>
    props.size === "small"
      ? "height: 180px; margin-bottom: -20px;"
      : ""} @media (max-width: 990px) {
    width: 100%;
    height: 180px;
    padding: 0;
  }

  .card-media-img {
    background-color: #ddd;
    height: ${props => (props.size === "small" ? "100%" : "212px")};
    width: ${props => (props.size === "small" ? "100%" : "150px")};
    box-shadow: ${props =>
      props.size === "small"
        ? "2px 2px 0px 0px rgba(0, 0, 0, 0.02)"
        : "0 3px 6px rgba(0, 0, 0, 0.2)"};
    float: left;
    margin-top: -25px;
    position: relative;
    border-radius: ${props =>
      props.size === "small" ? "2px 2px 0px 0px" : "2px"};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    @media (max-width: 990px) {
      width: 100%;
      height: 100%;
      margin-top: 0;
      border-radius: 2px 2px 0px 0px;
      box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.08);
    }
  }
`;

export default class WorkItemEmpty extends PureComponent {
  render() {
    return (
      <a>
        <Card className="shimme-card">
          <Cover size={this.props.size}>
            <div className="card-media-img show-loading-animation" />
          </Cover>
          <CardBody size={this.props.size}>
            {this.props.size !== "small" && (
              <h2 className="card-body-heading shimme-title">
                <div className="shimme-text show-loading-animation">
                  {"\u00A0"}
                </div>
              </h2>
            )}
            <ul className="card-body-description">
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
