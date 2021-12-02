import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    ul {
      --bs-scroll-height: '100px';
    }
  `}
`;
