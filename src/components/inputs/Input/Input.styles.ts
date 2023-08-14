/* eslint-disable no-empty-pattern */
import styled, { css } from 'styled-components';

export const Wrapper = styled('div')`
  display: inline-block;
  position: relative;
  width: 100%;
`;

export const WrapperFeedback = styled('div')`
  margin-top: 8px;
`;

export const Helper = styled.span`
  color: ${({}) => 'white'};
  display: block;
  font-size: ${({}) => '8px'};
  font-weight:${({}) => '8px'}

  width: 100%;
`;

export const Error = styled.span`
  color: ${({}) => 'white'}};
  display: block;
  font-size: ${({}) => '8px'};
  font-weight: ${({}) => '8px'};
  width: 100%;
`;

export const Example = styled.div`
  color: ${({}) => 'white'}};
  font-size: ${({}) => '8px'};
  font-style: normal;
  font-weight: ${({}) => '8px'}};
  left: 1.5rem;
  line-height: 20px;
  position: absolute;
  top: 2.8rem;
  z-index: 10;

  @supports (-moz-appearance: none) {
    top: 2.2rem;
  }
`;

export const Input = styled('input')(
  () => css`
    border-radius: ${({}) => '8px'}};
    box-shadow: none;
    height: ${({}) => '8px'}};

    :placeholder-shown {
      color: ${({}) => 'white'};
      font-size: ${({}) => '8px'};
      padding: 16px 0px 30px 16px;
    }
  `
);
