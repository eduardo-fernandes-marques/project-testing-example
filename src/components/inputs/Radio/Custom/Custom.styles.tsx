import styled, { css } from 'styled-components';

export type WrapperItem = {
  checked?: boolean;
};

export const WrapperItemIcon = styled.div<WrapperItem>`
  background-color: ${({ checked }) => checked && '#F56A00'};
  border: 1px solid #b6b9d0;
  border-radius: 10px;
  color: ${({ checked }) => (checked ? 'white' : '#b6b9d0')};
  height: 110px;
  margin: 5px;
  width: 110px;

  label {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;
    z-index: 11;
  }

  [type='radio'] {
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;
  }

  svg {
    path {
      color: ${({ checked }) => checked && 'white'};
      fill: ${({ checked }) => checked && 'white'};
    }
  }
`;

export const WrapperIcon = styled.div`
  display: flex;
  margin: auto;
  position: relative;
`;

export const WrapperItemOption = styled.div<WrapperItem>`
  border: 1px solid #b6b9d0;
  border-color: ${({ checked }) => (checked ? '#F56A00' : '#b6b9d0')};
  border-radius: 10px;
  flex: auto;
  flex-wrap: nowrap;
  margin: 10px;
  text-align: center;

  label {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 11;
  }

  [type='radio'] {
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;
  }

  > div {
    width: 100%;
  }

  ${({ theme }) => {
    return (
      theme &&
      css`
        @media (min-width: 1810px) {
          margin: 0 10px;
      `
    );
  }}
`;

export const WrapperItemOptionHeader = styled.div<WrapperItem>`
  background-color: ${({ checked }) => (checked ? '#F56A00' : '#b6b9d0')};
  border: ${({ checked }) => (checked ? '#F56A00' : '#b6b9d0')} 1px solid;
  border-radius: 10px 10px 0 0;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding: 24px 0;
  width: 100%;

  span {
    font-size: 26px;
  }
`;
export const WrapperItemOptionsDescription = styled.div`
  color: #b6b9d0;
  font-size: 1.2rem;
  text-align: start;
  width: 85%;

  * {
    margin: 2px;
  }

  *:not(:last-child) {
    border-bottom: 1px solid #b6b9d0;
    padding-bottom: 12px;
  }

  ${({ theme }) => {
    return (
      theme &&
      css`
        @media (min-width: 1500px) {
          max-width: 270px;
          `
    );
  }}
`;

export const WrapperItemOptionDescription = styled.div`
  align-items: center;
  display: flex;
  margin: 1rem 0;
  width: 100%;
`;

export const Link = styled.a`
  all: unset;
  color: inherit;
  text-decoration: underline;
`;
