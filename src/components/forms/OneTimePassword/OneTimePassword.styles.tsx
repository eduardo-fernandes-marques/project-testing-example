import styled, { css } from 'styled-components';

export const WrapperCodes = styled.div`
  display: flex;
  width: 80%;

  > div {
    margin-right: 24px;
  }

  ${({ theme }) => {
    return (
      theme &&
      css`
        @media (max-width: ${theme.breakpoints.small}) {
          > div {
            margin-right: 2px;
          }
      `
    );
  }}
`;

export const Input = styled('input')`
  border: 1px solid #b6b9d0;
  border-radius: 10px;
  height: 86px;
  text-align: center;
  width: 61px;
`;

export const Link = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  margin-top: 22px;
  outline: inherit;
  padding: 0;
  text-decoration-line: underline;

  ${({ theme }) => {
    return (
      theme &&
      css`
        @media (max-width: ${theme.breakpoints.small}) {
          margin-bottom: 10rem;
      `
    );
  }}
`;

export const WrapperActions = styled('div')`
  justify-content: flex-end;
`;
