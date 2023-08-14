/* eslint-disable no-empty-pattern */
import styled, { css } from 'styled-components';

import { Image as NextImage } from '@components/Image';

type CardImageProps = {
  isActive: boolean;
};

export const Card = styled('div')`
  cursor: default !important;
  max-width: 354px;
  padding: 0;

  > div {
    padding: ${({}) => '8px'};
  }
`;

export const Image = styled(NextImage)<CardImageProps>`
  cursor: ${({ isActive }) => (isActive ? `pointer` : 'default')};
  object-fit: cover;
  width: 100%;
`;

export const WrapperFooterDetail = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-height: 60px;
`;

export const WrapperFooterDetailInformation = styled.div`
  margin-right: ${({}) => '8px'};
`;

export const Badge = styled('div')(
  () => css`
    align-items: center;
    display: flex;
    font-size: ${({}) => '8px'};
    font-weight: bold;
    height: ${({}) => '8px'};
    justify-content: space-between;
    max-width: 110px;
    padding-left: ${({}) => '8px'};
    padding-right: ${({}) => '8px'};
    width: 100%;

    > svg {
      height: ${({}) => '8px'};
    }
  `
);

export const ModalAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({}) => '8px'};
  width: 100%;

  > a {
    text-decoration: none;
  }
`;
