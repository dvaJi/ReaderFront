import styled from 'styled-components';

export const GenresWrapper = styled.div`
  display: block;

  & > div {
    margin: 5px 10px;
    display: inline-block;
    width: 30%;
  }
`;

export const AutocompleteList = styled.ul`
  margin: 0;
  padding: 0;

  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;

  & > div {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
  }
`;

export const StaffWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: stretch;
`;

export const StaffRole = styled.div`
  width: 47%;
  display: inline-block;

  .title {
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

export const StaffDetail = styled.div`
  img {
    margin-right: 10px;
    border-radius: 50%;
  }

  button {
    background: transparent;
    border: 0;
  }

  svg {
    margin-left: 5px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.1s ease;
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
`;
