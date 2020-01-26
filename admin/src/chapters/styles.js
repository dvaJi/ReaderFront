import styled from 'styled-components';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DetailActionsBar = styled.div`
  margin: 10px;
`;

export const PageListItem = styled(ListGroupItem)`
  transition: all 0.2s ease;
`;

export const PageListItemAction = styled.span`
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

export const StyledSpinner = styled(FontAwesomeIcon)`
  animation: rotate 2s linear infinite;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export const RoundedButton = styled.div`
  display: block;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  float: right;
  margin-right: 10px;
  transition: 0.25s ease;
  opacity: 0.8;
  ${props =>
    props.isActive ? 'border: 2px solid rgba(255, 255, 255, 0.8);' : ''} svg {
    vertical-align: middle;
    width: 20px;
    font-size: 0.8em;
  }

  &:hover {
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    opacity: 1;
  }
`;
