/* eslint-disable no-empty-pattern */
import styled, { css } from 'styled-components';

export const Wrapper = styled.header`
  margin-bottom: ${({}) => '8px'};
`;

export const WrapperBrand = styled('div')(
  () => css`
    display: flex;
    justify-content: space-between;

    a {
      display: flex;
      width: 100px;
    }

    ${({ theme }) => {
      return (
        theme &&
        css`
        @media (min-width: ${theme.breakpoints.large}) {

          img {
            margin-left: -5px;
          }
      `
      );
    }}
  `
);

export const WrapperDescription = styled.div`
  margin-bottom: ${({}) => '8px'};
  margin-top: ${({}) => '8px'};
  white-space: pre-line;

  h1 {
  }
    font-size: ${({}) => '8px'};
  }

  p {
    font-size:  ${({}) => '8px'};
    margin-top: ${({}) => '8px'};
  }

  ${({ theme }) => {
    return (
      theme &&
      css`
        @media (min-width: ${theme.breakpoints.large}) {

          p {
            font-size: ${({}) => '8px'};
          }

          h1 {
            font-size: ${({}) => '8px'};
          }
      `
    );
  }}
`;
