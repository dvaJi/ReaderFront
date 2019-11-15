import React, { useState, useRef } from 'react';
import NextButton from './NextButton';
import Block from './Block';

import { SlideWrapper } from './styles';
import './slide.css';

export default function ComicSlide({ blocks, isLoading }) {
  const [carrouselStyle, setCarrouselStyle] = useState({
    opacity: '1',
    width: '30000px',
    transform: 'translate3d(-40px, 0px, 0px)'
  });
  const [transformValue, setTransformValue] = useState(0);
  const slideRef = useRef(null);

  const handleNextButton = () => {
    let slideWidth = 0;
    for (let index = 0; index < slideRef.current.childNodes.length; index++) {
      slideWidth += slideRef.current.childNodes[index].clientWidth;
    }
    let clientWidth = window.innerWidth || document.documentElement.clientWidth,
      pixelsToMove = clientWidth > 1280 ? clientWidth / 3 : clientWidth / 2,
      marginLeft = clientWidth <= 602 ? 20.5 : 41.5,
      finalSlideWidth = Math.round(slideWidth - blocks.length * marginLeft);

    const newTransformValue =
      transformValue < clientWidth - finalSlideWidth + 120
        ? -40
        : transformValue - pixelsToMove;
    const newStyle = {
      opacity: '1',
      width: finalSlideWidth + 'px',
      transform: `translate3d(${newTransformValue}px, 0px, 0px)`,
      transition: 'all 0.3s ease'
    };

    setTransformValue(newTransformValue);
    setCarrouselStyle(newStyle);
  };

  return (
    <SlideWrapper className="comic-slide-wrapper">
      <div className="comic-slide-wrapper-css">
        <div className="comic-slide-list">
          <div className="comic-slide-fr-list" style={{ padding: '0px 50px' }}>
            <div
              className="comic-slide-fr-track"
              style={carrouselStyle}
              ref={slideRef}
            >
              {!isLoading &&
                blocks.map((block, index) => (
                  <Block
                    key={index}
                    blocks={block.chapters}
                    blockId={block.block}
                    blockStyle={`block${block.block}`}
                  />
                ))}
            </div>
          </div>
          {blocks.length > 0 && <NextButton handleClick={handleNextButton} />}
        </div>
      </div>
    </SlideWrapper>
  );
}
