/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
  display:blocked;

    .pass-wrapper {
      position: relative;
      display:flex;
      justify-content: end;
      align-items: center;

    }
    i {
      position: absolute;
      margin-right:10px;
      cursor: pointer;
    }

  `}
`;


