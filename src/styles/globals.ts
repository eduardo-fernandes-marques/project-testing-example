import { themeGet } from '@styled-system/theme-get';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body, #root, input, select {
    font-family: ${themeGet('font')};
    height: 100%;
  }

  #__next {
    position: relative;
    height: 100%;
  }

  body {
    font-family: ${themeGet('font')};
    line-height: 1.5;
  }

  b { font-weight: ${themeGet('example.fontWeight.bold')}; }

  button { font-family: ${themeGet('font')}; }

  .grecaptcha-badge {
    bottom: 100px !important
  }
`;
