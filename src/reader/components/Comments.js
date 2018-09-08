import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import DisqusThread from '../../common/DisqusComments';
import Lazyload from 'react-lazyload';

const CommentsStyle = styled.div`
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  display: inline-block;
  width: 100%;
  text-align: left;
  margin-bottom: 15px;
  margin-top: 10px;
  padding: 15px 20px;
  position: relative;
  vertical-align: top;
  white-space: normal;
`;

class Comments extends PureComponent {
  render() {
    return (
      <Lazyload throttle={200} height={300}>
        <CommentsStyle>
          <h4>
            <FormattedMessage id="comments" defaultMessage="Comments" />
          </h4>
          <DisqusThread
            id={this.props.id}
            title={this.props.title}
            path={this.props.path}
          />
        </CommentsStyle>
      </Lazyload>
    );
  }
}

export default Comments;
