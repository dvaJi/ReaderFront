import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ReaderControlsContainer = styled.div`
  background-image: linear-gradient(180deg, #000, transparent);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  padding: 18px 0;
  z-index: 4000;
`;

export const ReaderControlsWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReaderControlsInfo = styled.div`
  display: flex;
`;

export const ReaderControlsLogo = styled.div`
  padding: 0 20px;
  color: #fff;
  font-size: x-large;
  font-weight: 700;
  width: 130px;
  text-align: center;
  margin-top: -5px;
  line-height: 25px;
`;

export const ReaderControlsChapterInfo = styled.div`
  display: flex;
  -webkit-box-orient: vertical;
  flex-direction: column;
`;

export const ReaderControlsWork = styled(Link)`
  transition: color 0.15s ease;
  display: block;
  line-height: 1;
  font-size: 16px;
  color: #fff !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-weight: 500;
`;

export const ReaderControlsChapters = styled.div`
  border-radius: 2px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background: transparent;
  border: 0;
  color: #fff;
  max-width: 100%;

  &::after {
    border-left: 0.35em solid transparent;
    border-right: 0.35em solid transparent;
    border-top: 0.35em solid;
    content: ' ';
    display: block;
    height: 0;
    width: 0;
    position: absolute;
    right: 0.5em;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
  }

  & > select {
    appearance: none;
    background: transparent;
    border: 0;
    outline: none;
    min-height: 100%;
    min-width: 100%;
    padding: 4px 20px 4px 10px;
    font-size: 16px;
    position: relative;
    z-index: 1;
    padding-left: 0;
    padding-right: 25px;
    cursor: pointer;
    width: 100%;
    text-overflow: ellipsis;
    color: #fff;

    & > option {
      background: #fff;
      color: rgba(0, 0, 0, 0.87);
      text-overflow: ellipsis;
    }
  }
`;

export const ReaderControlsActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 110px;
  margin-right: 15px;

  & > button {
    border-radius: 50%;
    outline: none !important;
    transition-duration: 0.4s !important;
    vertical-align: middle;
    background: transparent;
    border: none;
    color: rgb(255, 255, 255, 0.9);
    height: 34px;
    width: 34px;
    margin-right: 5px;

    &:hover {
      background: rgb(255, 255, 255, 0.15);
      color: rgb(255, 255, 255);
    }
  }
`;

export const ReaderControlsPagination = styled.div`
  border-radius: 2px;
  display: inline-block;
  vertical-align: middle;
  background: rgba(0, 0, 0, 0.2);
  border: 0;
  color: #fff;
  height: 48px;
  position: fixed;
  left: 10px;
  bottom: 10px;
  z-index: 4000;

  &::after {
    border-left: 0.35em solid transparent;
    border-right: 0.35em solid transparent;
    border-top: 0.35em solid;
    content: ' ';
    display: block;
    height: 0;
    width: 0;
    position: absolute;
    right: 0.5em;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
    border-top: 0;
    border-bottom: 0.35em solid;
    right: 1em;
  }

  & > select {
    appearance: none;
    background: transparent;
    border: 0;
    outline: none;
    min-height: 100%;
    min-width: 100%;
    font-size: 16px;
    position: relative;
    z-index: 1;
    cursor: pointer;
    line-height: 1.5;
    height: 100%;
    padding: 14px 35px 15px 20px;
    color: #fff;

    & > option {
      background: #fff;
      color: rgba(0, 0, 0, 0.87);
    }
  }
`;

export const ReaderMain = styled.div`
  max-width: none;
  max-height: none;
  min-height: calc(100vh - 3.5rem);
  min-width: 100%;
`;
