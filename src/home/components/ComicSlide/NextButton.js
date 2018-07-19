import React, { PureComponent } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Content = styled.span`
  color: #fff;
  position: relative;
  z-index: 200;
  transition: all 0.2s ease;
  border-radius: 5px;
  padding: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const Button = styled.button`
  border: 1px solid hsla(0, 0%, 100%, 0);
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  outline: none !important;
  background: linear-gradient(30deg, #6346c7, #573abb);
  color: rgba(0, 0, 0, 0.7);
  transition: all 0.2s ease;
  overflow: hidden;
  position: absolute;
  margin: 5px;
  bottom: -41px;
  right: 40px;
  width: auto;
  border-radius: 50%;
  box-shadow: 0 2px 15px -4px rgba(0, 0, 0, 0.6);
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.6);
    transform: translateY(-4px);
  }

  &:active {
    background: linear-gradient(30deg, #7253df, #5d3ec7);
    box-shadow: 0 5px 20px -3px rgba(0, 0, 0, 0.8);
    transform: translateY(-2px);
  }
`;

const NextIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
`;

export default class NextButton extends PureComponent {
  render() {
    return (
      <Button
        onClick={e => this.props.handleClick()}
        aria-label="Next"
        type="button"
      >
        <Content>
          <NextIcon icon={faArrowRight} />
        </Content>
      </Button>
    );
  }
}
