import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    nav {
      min-height: 65px;
    }
    ul {
      --bs-scroll-height: '100px';
    }
    .text-color {
      font-size: 26px;
      color: #ffffff;
      text-decoration: none;
      transition: 0.3s;
      margin-right: 20px;
    }
    .text-color:hover {
      font-size: 28px;
      color: #cdcdcd;
      text-decoration: none;
    }
  `}
`;
