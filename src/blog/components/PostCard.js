import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: 0.5s ease;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);

  h3 {
    padding: 130px 0;
  }
`;

const Card = styled(Link)`
  color: #4b4f56;
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 355px;
  background-color: white;
  vertical-align: top;
  text-align: left;
  height: 480px;
  margin: 20px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  white-space: normal;
  transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 40px 40px rgba(0, 0, 0, 0.16);
    transform: translate(0, -20px);
    transition-delay: 0s !important;

    ${CardOverlay} {
      opacity: 1;
    }
  }
`;

const CardHero = styled.div`
  background-image: url('${props => props.thumb}');
  background-color: white;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  position: relative;
  clear: both;
  float: left;
  overflow: auto;
  width: 100%;
  height: 296px;
  padding: 20px;
`;

const CardBody = styled.div`
  position: relative;
  clear: both;
  float: left;
  width: 100%;
  overflow: visible;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  z-index: 2;
`;

const CardBodyTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  margin-bottom: 12px;
  color: #1d2129;
`;

const CardBodyDescription = styled.div`
  height: 74px;
  color: #4b4f56;
  display: block;
  display: -webkit-box;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  line-height: 20px;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
`;

const CardFooter = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  position: absolute;
  padding-left: 20px;
  padding-right: 20px;
  bottom: 0px;
  margin: 0 auto;
  width: 100%;
`;

const CardFooterWrapper = styled.div`
  height: 46px;
  line-height: 46px;
  border-top: 1px solid #e9ebee;
`;

const CardFooterTag = styled.div`
  color: #90949c;
  display: inline-block;
`;

class PostCard extends Component {
  render() {
    const { post, children, thumbnail, onClick } = this.props;

    return (
      <Card to={'/blog/' + post.stub} onClick={() => onClick(post)}>
        <CardHero thumb={thumbnail}>
          <CardOverlay>
            <h3>
              <FormattedMessage id="read_more" defaultMessage="Read More" />
            </h3>
          </CardOverlay>
        </CardHero>
        <CardBody>
          <CardBodyTitle>{post.title}</CardBodyTitle>
          <CardBodyDescription>{children}</CardBodyDescription>
        </CardBody>
        <CardFooter>
          <CardFooterWrapper layout="row bottom-left">
            <CardFooterTag>
              {post.categoryLabel && (
                <FormattedMessage
                  id={post.categoryLabel}
                  defaultMessage={post.categoryLabel}
                />
              )}
            </CardFooterTag>
          </CardFooterWrapper>
        </CardFooter>
      </Card>
    );
  }
}

export default PostCard;
