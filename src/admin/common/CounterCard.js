import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Card = styled(Link)`
  color: #6c757d;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(24, 28, 33, 0.06);
  border-radius: 0.25rem;
  transition-property: all;
  transition-duration: 250ms;

  .icon {
    transition-property: all;
    transition-duration: 200ms;
  }

  &:hover {
    background-color: rgba(91, 60, 196, 0.1);
    text-decoration: none;

    .icon {
      transform: translateY(4px);
    }
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.05);
    text-decoration: none;

    .icon {
      transform: translateY(-4px);
    }
  }
`;

export const CounterCard = props => (
  <Card to={props.to} className="mb-4">
    <div className="card-body">
      <div className="d-flex align-items-center">
        <FontAwesomeIcon className="icon" color={props.color} size="2x" icon={props.icon} />
        <div className="ml-3">
          <div className="text-muted small">{props.title}</div>
          <div className="text-large">{props.total}</div>
        </div>
      </div>
    </div>
  </Card>
);
