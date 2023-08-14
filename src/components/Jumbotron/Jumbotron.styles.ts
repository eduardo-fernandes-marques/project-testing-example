import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
  position: relative;

  img {
    height: 100%;
    object-fit: cover;
    position: absolute;
    width: 100%;
  }

  ${({ theme }) => {
    return css`
        @media (min-width: ${theme.breakpoints.extraLarge}) {
          width: 60%;
          align-items: center;
          background-color: white;
          display: flex;
          justify-content: center;
      `;
  }};
`;
