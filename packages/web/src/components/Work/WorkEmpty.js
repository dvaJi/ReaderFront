import React, { memo } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';

import { InfoStyle } from './Info';
import { ChapterListStyle, List as ChaptersList, ChapterRow } from './styles';

import { theme as rfTheme } from '@readerfront/ui';
const { background, toRgb } = rfTheme;

const shimmeColor = theme('mode', {
  light: toRgb(background.light.darkest),
  dark: toRgb(background.dark.lighter)
});

const Info = styled(InfoStyle)`
  width: 100%;
`;

const Description = styled.div`
  margin-bottom: 25px;
`;

const InfoTitle = styled.div`
  background-color: rgba(${shimmeColor}, 0.2);
  width: 50%;
  height: 20px;
`;

const InfoText = styled.div`
  background-color: rgba(${shimmeColor}, 0.2);
`;

const Text = styled.div`
  background-color: rgba(${shimmeColor}, 0.2);
`;

const TextTitle = styled.div`
  background-color: rgba(${shimmeColor}, 0.2);
  width: 30%;
`;

const ListItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  border-radius: 0.25rem;
`;

const Media = styled.div`
  position: relative;
  display: block;
  padding: 0;
  flex-shrink: 0;
  border-radius: inherit;
  transition: box-shadow 0.15s linear;

  &:after {
    content: '';
    display: block;
    padding-top: 120%;
  }
`;

const MediaContent = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0;
  border-radius: inherit;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: hsla(0, 0%, 47.1%, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListContent = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;
`;

function SerieEmpty() {
  return (
    <div className="SerieEmpty shimme-serie row">
      <div className="col-lg-4 col-md-5 col-xs-12">
        <ListItem>
          <Media className="media show-loading-animation">
            <MediaContent className="media-content" />
          </Media>
          <ListContent />
        </ListItem>
      </div>
      <div className="col-lg-8 col-md-7 col-xs-12 text-muted">
        <Info>
          <Description>
            <h4>
              <InfoTitle className="show-loading-animation">
                {'\u00A0'}
              </InfoTitle>
            </h4>
            <InfoText className="show-loading-animation">{'\u00A0'}</InfoText>
          </Description>
          <Description>
            <h4>
              <InfoTitle className="show-loading-animation">
                {'\u00A0'}
              </InfoTitle>
            </h4>
            <InfoText className="show-loading-animation">{'\u00A0'}</InfoText>
            <h4>
              <InfoTitle className="show-loading-animation">
                {'\u00A0'}
              </InfoTitle>
            </h4>
            <InfoText className="show-loading-animation">{'\u00A0'}</InfoText>
          </Description>
        </Info>
        <ChapterListStyle className="col-md-12">
          <h2>
            <TextTitle className="show-loading-animation">{'\u00A0'}</TextTitle>
          </h2>
          <ChaptersList>
            <ChapterRow>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterRow>
            <ChapterRow>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterRow>
            <ChapterRow>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterRow>
            <ChapterRow>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterRow>
            <ChapterRow>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterRow>
            <ChapterRow>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterRow>
            <ChapterRow>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterRow>
          </ChaptersList>
        </ChapterListStyle>
      </div>
    </div>
  );
}

export default memo(SerieEmpty);
