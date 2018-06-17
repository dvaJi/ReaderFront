import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Overlay = styled.div`
  background: rgba(31, 38, 49, 0.8);
  color: rgb(237, 241, 245);
  font-size: 1.4rem;
  padding: 12px;
  width: 100%;
  transition: all 0.2s ease;
  transform: translate3d(0px, 130px, 0px);

  .title {
    line-height: 17px;
    color: inherit;
    text-decoration: none;
    transition: 0.15s;
    outline: 0;
  }
  .desc {
    opacity: 0;
    height: 0;
    font-size: 12px;
    max-height: 100px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    transition: opacity 0.4s linear;
  }

  &:hover {
    .desc {
      opacity: 1;
      height: auto;
    }
  }
`;

const Serie = styled(Link)`
  background-image: url(${props => props.cover});
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 350px;
  position: relative;
  overflow: hidden;

  &:hover {
    text-decoration: none !important;

    ${Overlay} {
      transform: translate3d(0px, 0px, 0px);
    }
  }
`;

const LoadingCover = styled.div`
  background-color: #ddd;
  min-height: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default class RecommendedComic extends PureComponent {
  render() {
    const coverUrl =
      this.props.serie && this.props.serie.thumb2
        ? this.props.serie.thumb2
        : "/static/images/default-cover.png";
    return (
      <div className="Recommended mb-4">
        <h3>{this.props.title}</h3>
        {!this.props.isLoading ? (
          <Serie to={`serie/${this.props.serie.stub}`} cover={coverUrl}>
            <Overlay>
              <span className="title">{this.props.serie.name}</span>
              <span className="desc">{this.props.serie.description}</span>
            </Overlay>
          </Serie>
        ) : (
          <LoadingCover className="show-loading-animation" />
        )}
      </div>
    );
  }
}
