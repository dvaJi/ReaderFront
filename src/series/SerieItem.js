import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SerieCover from "./SerieCover";

const Card = styled.div`
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: inline-block;
  margin-bottom: 65px;
  margin-right: 1.5%;
  margin-left: 1.5%;
  transform: translateY(10px);
  transition-property: all;
  transition-duration: 250ms;
  position: relative;
  width: 47%;
  white-space: normal;
  vertical-align: top;

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
    margin-bottom: 15px;
    padding-left: 15%;
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

export default class SerieItem extends Component {
  render() {
    const { serie, truncate, redirectTo } = this.props;
    return (
      <Link to={redirectTo(serie)}>
        <Card>
          <SerieCover cover={serie.thumb2} name={serie.name} />
          <CardBody>
            <h2 className="card-body-heading">{serie.name}</h2>
            <ul className="card-body-description">
              {truncate(serie.description)}
            </ul>
          </CardBody>
        </Card>
      </Link>
    );
  }
}
