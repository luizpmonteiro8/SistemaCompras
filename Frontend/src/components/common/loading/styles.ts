import styled, { css } from 'styled-components';

export const Loading = styled.div`
  ${({ theme }) => css`
    display: flex;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    align-items: center;
    justify-content: center;
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css``}
`;
