/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestUtils from 'react-dom/test-utils';
import { I18nextProvider, I18nextProviderProps } from 'react-i18next';
import { ThemeProvider } from 'styled-components';

import { LeadProvider } from '@contexts/lead';
import { StepProvider } from '@contexts/step';

import i18n from '@i18n/setup';

import { Layout } from '@components/Layout';

import theme from '@styles/theme';

export const ThemeWrapper: React.FC<Partial<I18nextProviderProps>> = (props) => (
  <ThemeProvider theme={theme}>
    <I18nextProvider {...props} i18n={i18n} />
  </ThemeProvider>
);

export type ContextWrapper = {
  withoutLayout?: boolean;
};

export const ContextWrapper: React.FC<React.PropsWithChildren<ContextWrapper>> = ({
  children,
  withoutLayout,
  ...props
}) => (
  <ThemeProvider theme={theme}>
    <I18nextProvider i18n={i18n}>
      <LeadProvider {...props}>
        <StepProvider {...props}>
          {withoutLayout ? children : <Layout>{children}</Layout>}
        </StepProvider>
      </LeadProvider>
    </I18nextProvider>
  </ThemeProvider>
);

const renderWithTheme = (
  ui: React.ReactElement,
  options: RenderOptions & { providersConfig: unknown } = { providersConfig: {} }
) => render(ui, { wrapper: ThemeWrapper, ...options });

const renderWithContext = (
  ui: React.ReactElement,
  {
    providersConfig,
    withoutLayout,
    ...options
  }: RenderOptions & { providersConfig?: any; withoutLayout?: boolean } = {
    providersConfig: {},
    withoutLayout: false,
  }
) =>
  render(ui, {
    wrapper: (props) => (
      <ContextWrapper {...props} {...providersConfig} withoutLayout={withoutLayout} />
    ),
    ...options,
  });

const changeInputMaskValue = (element: HTMLInputElement, value: string) => {
  element.value = value;
  element.selectionStart = element.selectionEnd = value.length;

  TestUtils.Simulate.change(element);
};

export * from '@testing-library/react';
export { renderWithTheme, userEvent, renderWithContext, changeInputMaskValue };
