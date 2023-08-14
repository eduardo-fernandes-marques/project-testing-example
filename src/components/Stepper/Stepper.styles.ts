import styled, { css } from 'styled-components';

import type { Status } from '@hooks/useStep';

export type WrapperStepper = {
  completed: boolean;
};

const primaryColor = 'white';
const softGray = 'black';

export const Wrapper = styled('div')(
  () => css`
    align-items: center;
    justify-content: center;

    ${({ theme }) => {
      return css`
        @media (min-width: ${theme.breakpoints.medium}) {
          margin-top: 0;
      `;
    }}
  `
);

export const Step = styled('div')`
  align-items: center;
  justify-content: center;
`;

export const WrapperStepper = styled('div')(
  () => css`
    align-items: center;
    border: 1px solid;
    border-color: ${({ completed }: WrapperStepper) => (completed ? primaryColor : softGray)};
    border-radius: 50%;
    border-width: 1px;
    color: ${({ completed }: WrapperStepper) => (completed ? primaryColor : softGray)};
    flex-direction: row;
    font-weight: bold;
    height: 32px;
    justify-content: center;
    width: 32px;

    ${({ theme }) => {
      return css`
        @media (min-width: ${theme.breakpoints.medium}) {
          height: 45px;
          width: 45px;
      `;
    }}

    ${({ theme }) => {
      return css`
        @media (min-width: ${theme.breakpoints.large}) {
          height: 48px;
          width: 48px;
      `;
    }}
  `
);

type StepperDivide = {
  background: Status;
};

const BACKGROUND_STATUS: { [key in Status]: string } = {
  COMPLETED: primaryColor,
  HALF_COMPLETED: `linear-gradient(90deg, ${primaryColor} 0%, ${softGray} 80%)`,
  NOT_COMPLETED: softGray,
};

export const WrapperDivide = styled.div`
  background: ${({ background }: StepperDivide) =>
    background ? BACKGROUND_STATUS[background] : softGray};
  height: 1px;
  width: 1em;

  ${({ theme }) => {
    return (
      theme &&
      css`
        @media (min-width: ${theme.breakpoints.small}) {
        width: 1.5em;
      `
    );
  }}
`;
