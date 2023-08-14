/* eslint-disable no-empty-pattern */
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  min-height: 100%;
  width: 100%;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding-left: ${({}) => '8px'};
  padding-right: ${({}) => '8px'};
  padding-top: ${({}) => '8px'};
  position: relative;

  ${({ theme }) => {
    return (
      theme &&
      css`
        @media (min-width: ${theme.breakpoints.extraLarge}) {
          width: 40%;
          padding-left: ${({}) => '8px'};
          padding-right: ${({}) => '8px'};

      `
    );
  }}
`;
