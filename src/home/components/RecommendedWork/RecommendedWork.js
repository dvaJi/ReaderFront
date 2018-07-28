import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Overlay = styled.div`
  background: rgba(31, 38, 49, 0.8);
  color: rgb(237, 241, 245);
  font-size: 1.4rem;
  padding: 12px;
  width: 100%;
  transition: all 0.15s ease;
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
    transition: opacity 0.6s linear;
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

      .desc {
        opacity: 1;
        height: auto;
      }
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

export default class RecommendedWork extends PureComponent {
  render() {
    const dir = this.props.work
      ? this.props.work.stub + '_' + this.props.work.uniqid
      : '';
    const coverUrl =
      this.props.work && this.props.work.covers
        ? `/works/${dir}/${this.props.work.covers.medium_thumb.filename}`
        : '/static/images/default-cover.png';
    return (
      <div className="Recommended mb-4">
        <h3>{this.props.title}</h3>
        {!this.props.isLoading ? (
          <Serie to={`work/${this.props.work.stub}`} cover={coverUrl}>
            <Overlay>
              <span className="title">{this.props.work.name}</span>
              <span className="desc">{this.props.description}</span>
            </Overlay>
          </Serie>
        ) : (
          <LoadingCover className="show-loading-animation" />
        )}
      </div>
    );
  }
}
