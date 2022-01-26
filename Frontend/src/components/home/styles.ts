import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: block;
    flex-direction: column;
    margin-top: 5px;
  `}
`;

export const Barchart = styled.div`
  ${({ theme }) => css`
    margin-top: 5px;
    @media (max-width: 768px) {
      overflow-x: scroll;
    }
  `}
`;

export const Card = styled.div`
  ${({ theme }) => css`
    max-width: 170px;
    display: flex;
  `}
`;
