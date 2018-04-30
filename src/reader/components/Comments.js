import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DisqusThread from "../../common/DisqusComments";

const Comments = styled.div`
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

class Comment extends PureComponent {
  render() {
    return (
      <Comments>
        <h4>{this.context.t("Comentarios")}</h4>
        <DisqusThread
          id={this.props.id}
          title={this.props.title}
          path={this.props.path}
        />
      </Comments>
    );
  }
}

Comment.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Comment;