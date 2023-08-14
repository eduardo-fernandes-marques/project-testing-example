import React from 'react';

import { useStepContext } from '@contexts/step';
import useAnalytics from '@hooks/useAnalytics';
import useFacebookPixel from '@hooks/useFacebookPixel';

import type { ContentProps } from '@components/Content';
import { Content } from '@components/Content';
import type { HeaderProps } from '@components/Header';
import { Header } from '@components/Header';
import { Jumbotron } from '@components/Jumbotron';

import * as S from './Layout.styles';

export type Props = React.FC<React.PropsWithChildren<{ mount?: boolean }>> & {
  Header: HeaderProps;
  Content: ContentProps;
};

export const Layout: Props = ({ children, mount = true }) => {
  const {
    state: {
      current: { description, title, value },
    },
  } = useStepContext();

  useAnalytics({ pagePath: value, pageTitle: title });
  useFacebookPixel({ pagePath: value, pageTitle: title });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!mount) return <>{children}</>;

  return (
    <S.Wrapper>
      <S.Section>
        <Header title={title} description={description} />
        <Content>{children}</Content>
      </S.Section>
      <Jumbotron />
    </S.Wrapper>
  );
};

Layout.Header = Header;
Layout.Content = Content;
