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
  font-weight: ${({}) => '8px'};
  width: 100%;
`;

export const Error = styled.span`
  color: ${({}) => 'white'};
  display: block;
  font-size: ${({}) => '8px'};
  font-weight: ${({}) => '8px'};
  width: 100%;
`;

export const Example = styled.div`
  color: ${({}) => 'white'};
  font-size: ${({}) => '8px'};
  font-style: normal;
  font-weight: ${({}) => '8px'};
  left: 1.5rem;
  line-height: ${({}) => '8px'};
  position: absolute;
  top: 2.8rem;
  z-index: 10;

  @supports (-moz-appearance: none) {
    top: 2.2rem;
  }
`;

export const Select = styled('input')(
  () => css`
    border-radius: ${({}) => '8px'};
    box-shadow: none;

    font-size: ${({}) => '8px'};
    height: ${({}) => '8px'};
    padding-bottom: ${({}) => '8px'};

    @supports (-moz-appearance: none) {
      padding: 0px 0px 16px 24px;
    }
  `
);
