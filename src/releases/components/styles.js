import styled from 'styled-components';

export const Divider = styled.hr`
  height: 0;
  margin: 0;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: hsla(0, 0%, 100%, 0.2);
  margin-left: 72px;
  margin-right: 0;
  width: calc(100% - 72px);
  border-bottom-color: hsla(0, 0%, 100%, 0.12);
`;

export const ChaptersList = styled.ul`
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 400;
  letter-spacing: 0.00937em;
  text-decoration: inherit;
  text-transform: inherit;
  color: #fff;
  margin: 0;
  padding: 0;
  line-height: 1.5rem;
  list-style-type: none;
`;

export const ChapterListItem = styled.li`
  cursor: pointer;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
  overflow: hidden;
  font-weight: 400;
  height: 72px;
  left: 0;

  &:focus {
    outline: none;
  }
`;

export const ChapterItemNumber = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: hsla(0, 0%, 0%, 0.8);
  margin-left: 0;
  margin-right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const ChapterItemText = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
`;

export const ChapterItemSecondaryText = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  -webkit-font-smoothing: antialiased;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.01786em;
  text-decoration: inherit;
  text-transform: inherit;
`;
