import styled, { css } from 'styled-components';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootswatch/dist/lumen/bootstrap.min.css';

export const Wrapper = styled.div`
  ${({ theme }) =>
    css`
      overflow-y: hidden;
    `}
  body {
    overflow-y: hidden;
    background-color: '#0000ff';
  }
  .row {
    margin: 0;
  }
`;

export const Container = styled.div`
  ${({ theme }) => css`
    @media(min-width: 949px) {
      min-height: 78vh;
  `}
`;

export const MenuContainer = styled.div`
  ${({ theme }) => css``}
`;

export const FooterContainer = styled.div`
  ${({ theme }) => css``}
`;

export const ContentContainer = styled.main`
  ${({ theme }) => css``}
`;
