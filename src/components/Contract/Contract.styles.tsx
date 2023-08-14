/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { css } from 'styled-components';

export const WrapperCheckbox = styled('div')`
  margin-left: 1rem;

  > a {
    margin-top: 2px;
  }
`;

export const WrapperActions = styled('div')`
  justify-content: flex-end;
`;

export const WrapperContent = styled('div')(
  () => css`
    flex-direction: column;
    height: 90%;
    margin-top: 1.5rem;
    overflow: auto;

    ::-webkit-scrollbar {
      width: 0.5rem;
    }

    ::-webkit-scrollbar-track {
      border-radius: 8px;
      box-shadow: inset 0 0 3px #d1d1e3;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #667080;
      height: 20%;
    }

    h1,
    h2,
    h3,
    h4 {
      color: ${({}) => 'white'};
      font-weight: normal;
      margin-bottom: ${({}) => 'white'};
    }

    h1 {
      font-size: 2.5em;
      font-weight: 600;
    }

    h2 {
      font-size: 2em;
    }

    h3 {
      font-size: 1.5em;
      font-weight: normal;
    }

    h4 {
      font-size: 1em;
      font-weight: normal;
    }

    p {
      margin-bottom: ${({}) => 'white'};
    }

    table {
      thead {
        color: ${({}) => 'white'};
        font-size: 1.5em;
      }

      margin-bottom: ${({}) => 'white'};
      text-align: left;
    }
  `
);

export const Modal = styled('div')`
  border-radius: 24px;
  height: 80%;
`;
