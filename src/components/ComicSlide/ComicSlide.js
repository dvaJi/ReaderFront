import React, { PureComponent } from "react";
import NextButton from "./NextButton";
import Block from "./Block";
import "./slide.css";

export default class ComicSlide extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      _transform: 0,
      style: {
        opacity: "1",
        width: "30000px",
        transform: "translate3d(-40px, 0px, 0px)"
      }
    };

    this.slideRef = React.createRef();

    this.handleNextButton = this.handleNextButton.bind(this);
  }

  handleNextButton() {
    let slideWidth = 0;
    for (
      let index = 0;
      index < this.slideRef.current.childNodes.length;
      index++
    ) {
      slideWidth += this.slideRef.current.childNodes[index].clientWidth;
    }
    let clientWidth = window.innerWidth || document.documentElement.clientWidth,
      pixelsToMove = clientWidth > 1280 ? clientWidth / 3 : clientWidth / 2,
      marginLeft = clientWidth <= 602 ? 20.5 : 41.5,
      finalSlideWidth = Math.round(
        slideWidth - this.props.blocks.length * marginLeft
      );

    const newTransformValue =
      this.state._transform < clientWidth - finalSlideWidth + 120
        ? -40
        : this.state._transform - pixelsToMove;
    const newStyle = {
      opacity: "1",
      width: finalSlideWidth + "px",
      transform: `translate3d(${newTransformValue}px, 0px, 0px)`,
      transition: "all 0.3s ease"
    };
    this.setState({ _transform: newTransformValue, style: newStyle });
  }

  render() {
    return (
      <div className="comic-slide-wrapper">
        <div className="comic-slide-wrapper-css">
          <div className="comic-slide-list">
            <div
              className="comic-slide-fr-list"
              style={{ padding: "0px 50px" }}
            >
              <div
                className="comic-slide-fr-track"
                style={this.state.style}
                ref={this.slideRef}
              >
                {!this.props.isLoading && this.props.blocks.map((block, index) => (
                  <Block
                    key={index}
                    blocks={block.chapters}
                    blockId={block.block}
                    blockStyle={`block${block.block}`}
                  />
                ))}
              </div>
            </div>
            {this.props.blocks.length > 0 && (
              <NextButton handleClick={this.handleNextButton} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
