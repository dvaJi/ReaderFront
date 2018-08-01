import styled from 'styled-components';

export const Card = styled.div`
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
`;

export const CardHeader = styled.div`
  padding: 0.875rem 1.5rem;
  margin-bottom: 0;
  background-color: transparent;
  border-bottom: 1px solid rgba(24, 28, 33, 0.06);
  line-height: 1.54;
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;

  &:first-child {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
  }
`;
