import React, { PureComponent } from "react";
import styled from "styled-components";

const CardMedia = styled.div`
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
    margin-bottom: 0px;
  }
`;

const Cover = styled.div`
  background-image: url(${props => props.thumb});
  background-position: 50% 50%;
  background-size: cover;
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
    box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.02);
  }
`;

const Overlay = styled.div`
  background: rgba(31, 38, 49, 0.8);
  color: rgb(237, 241, 245);
  font-size: 1.4rem;
  padding: 12px;
  width: 100%;

  .title {
    line-height: 17px;
    color: inherit;
    text-decoration: none;
    transition: 0.15s;
    outline: 0;
  }
`;

export default class SerieCover extends PureComponent {
  render() {
    const coverUrl = this.props.cover
      ? this.props.cover
      : "/static/images/default-cover.png";

    return (
      <CardMedia size={this.props.size}>
        <Cover size={this.props.size} thumb={coverUrl}>
          {this.props.size === "small" && (
            <Overlay>
              <span className="title">{this.props.name}</span>
            </Overlay>
          )}
        </Cover>
        {/*<span className="card-media-tag card-media-tag-orange">En Curso</span>*/}
      </CardMedia>
    );
  }
}
