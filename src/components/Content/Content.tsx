import React from 'react';

import { useUTM } from '@hooks/useUTM';

import * as S from './Content.styles';

export type Props = React.FC<React.PropsWithChildren>;
export const Content: Props = ({ children }) => {
  const [element] = useUTM();

  return (
    <S.Wrapper>
      {element}
      {children}
    </S.Wrapper>
  );
};
