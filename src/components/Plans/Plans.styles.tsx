import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;

  ${({ theme }) => {
    return (
      theme &&
      css`
        @media (max-width: 1650px) {
          flex-wrap: wrap;
      `
    );
  }}
`;
