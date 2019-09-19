import styled from 'styled-components';

export const ReaderControlsContainer = styled.div`
  padding: 0 !important;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`;

export const ReaderControlsWrapper = styled.div`
  z-index: 1;
  flex-wrap: nowrap !important;
  display: flex;
  margin-right: 0;
  margin-left: 0;
  order: 1;

  & > div {
    position: relative;
  }
`;

export const ReaderControlsCol = styled.div`
  display: flex;
  width: 100%;
  min-height: 1px;
  margin-right: 0;
  margin-left: 0;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  flex-direction: column !important;
  flex-wrap: nowrap !important;
  padding-right: 0;
  padding-left: 0;

  & > div {
    position: relative;
  }
`;

export const ReaderControlsTitle = styled.div`
  text-align: center !important;
  padding: 0.5rem !important;
  flex: 0 0 auto;
  width: auto;
  max-width: none;
  min-height: 1px;
`;

export const ReaderControlsChapters = styled.div`
  border-top: 1px solid rgba(128, 128, 128, 0.5);
  padding-right: 0;
  padding-left: 0;
  align-items: center !important;
  flex: 0 0 auto;
  width: auto;
  max-width: none;
  min-height: 1px;
  margin-right: 0;
  margin-left: 0;
  display: flex;
  flex-wrap: wrap;

  .chapter-link {
    position: relative;
    min-height: 1px;
    flex: 0 0 auto;
    width: auto;
    max-width: none;
    padding-right: 5px;
    padding-left: 5px;
    font-size: 30px;
  }
`;

export const ReaderControlsActions = styled.div`
  padding: 0.25rem !important;

  button {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    position: relative;
    width: 100%;
    min-height: 1px;
    margin: 0.25rem !important;
  }
`;

export const ReaderMain = styled.div`
  max-width: none;
  max-height: none;
  min-height: calc(100vh - 3.5rem);
  min-width: 100%;

  ${props =>
    props.fitVertical &&
    `height: calc(100vh - 3.5rem);
  max-height: calc(100vh - 3.5rem);`}

  ${props =>
    props.fitVertical &&
    props.headerHidden &&
    `height: 100vh;
    max-height: 100vh;`}
`;
