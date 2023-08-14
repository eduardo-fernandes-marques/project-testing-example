import styled from 'styled-components';

export const Wrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  width: 100%;

  :after {
    content: '';
    width: 10em;
  }
`;
