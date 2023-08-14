/* eslint-disable no-empty-pattern */
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  align-content: flex-end;

  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ButtonConfirm = styled('button')(
  () => css`
    border-radius: ${({}) => '2px'};
    font-weight: initial;

    height: ${({}) => '24px'};
    width: 186px;
  `
);

export const ButtonDecline = styled('button')(
  () => css`
    border-radius: ${({}) => '2px'};
    font-weight: initial;
    height: ${({}) => '24px'};
    width: 123px;

    :disabled {
      cursor: initial;
      opacity: 0;
    }
  `
);
