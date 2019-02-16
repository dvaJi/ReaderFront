import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Paginator = styled.div`
  height: 38px;
  margin-bottom: 10px;
`;

export const ReleaseRow = styled(Link)`
  display: inherit;
  color: inherit;
  text-decoration: none !important;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
`;
