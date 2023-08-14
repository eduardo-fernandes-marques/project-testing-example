import React from 'react';

import { LayoutProps, SpaceProps } from 'styled-system';

import * as S from './Image.styles';

type ImageProps = S.ImageProps &
  Partial<LayoutProps> &
  SpaceProps & {
    alt: string;
    src: string;
  };

export const Image: React.FC<ImageProps> = ({ alt, src, ...props }: ImageProps) => (
  // @ts-ignore
  <S.Image src={src} alt={alt} {...props} />
);
