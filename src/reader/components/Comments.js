import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Lazyload from 'react-lazyload';

import DisqusThread from '../../common/DisqusComments';
import { CommentsStyle } from './styles';

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
