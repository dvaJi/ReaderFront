import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { InfoStyle } from './Info';
import { ChapterLi } from './Chapter';
import { ChapterListStyle, List as ChaptersList } from './ChapterList';

const Info = styled(InfoStyle)`
  width: 100%;
`;

const Description = styled.div`
  margin-bottom: 25px;
`;

const InfoTitle = styled.div`
  background-color: #ddd;
  width: 50%;
  height: 20px;
`;

const InfoText = styled.div`
  background-color: #ddd;
`;

const Text = styled.div`
  background-color: #ddd;
`;

const TextTitle = styled.div`
  background-color: #ddd;
  width: 30%;
`;

const Cover = styled.div`
  background-color: #ddd;
  text-align: center;
  margin: 20px auto;
  width: 100%;
  height: 100%;
  min-height: 300px;
`;

export default class SerieEmpty extends PureComponent {
  render() {
    return (
      <div className="SerieEmpty shimme-serie row">
        <div className="col-md-4">
          <Cover className="show-loading-animation">{'\u00A0'}</Cover>
        </div>
        <div className="col-md-8 col-md-offset-1">
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
        </div>
        <ChapterListStyle className="col-md-12">
          <h2>
            <TextTitle className="show-loading-animation">{'\u00A0'}</TextTitle>
          </h2>
          <ChaptersList>
            <ChapterLi>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterLi>
            <ChapterLi>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterLi>
            <ChapterLi>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterLi>
            <ChapterLi>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterLi>
            <ChapterLi>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterLi>
            <ChapterLi>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterLi>
            <ChapterLi>
              <Text className="show-loading-animation">{'\u00A0'}</Text>
            </ChapterLi>
          </ChaptersList>
        </ChapterListStyle>
      </div>
    );
  }
}
