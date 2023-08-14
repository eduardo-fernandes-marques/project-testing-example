/* eslint-disable no-empty-pattern */
import styled from 'styled-components';

export const Wrapper = styled.form`
  height: 100%;
  width: 100%;
`;

export const WrapperFields = styled.div`
  margin: 1.5rem;

  > div {
    margin-bottom: 2.5rem;
  }

  min-height: 85%;
`;

export const WrapperError = styled.div`
  color: ${({}) => 'white'};
  display: block;
  font-size: ${({}) => '1rem'};
  font-weight: ${({}) => 'bold'};
  margin: 0.5rem 1rem;
  width: 100%;
`;
