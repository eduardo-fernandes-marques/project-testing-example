import React from 'react';

import NextLink from 'next/link';

import { Image } from '@components/Image';
import { Stepper } from '@components/Stepper';

import * as S from './Header.styles';

export type Props = React.FC<
  React.PropsWithChildren<Partial<{ title: string; description: string }>>
>;

export const Header: Props = ({ description, title }) => (
  <S.Wrapper>
    <S.WrapperBrand aria-label="Testing Example" lang="en">
      <nav>
        <NextLink href="/" passHref>
          <a href="replace">
            <Image src="/images/testing-logo-horizontal.svg" alt="logo da teste" height="30px" />
          </a>
        </NextLink>
      </nav>

      <Stepper />
    </S.WrapperBrand>

    <S.WrapperDescription>
      <h1>{title}</h1>

      <h2>{description}</h2>
    </S.WrapperDescription>
  </S.Wrapper>
);
