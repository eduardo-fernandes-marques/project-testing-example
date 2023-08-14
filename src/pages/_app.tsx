import React from 'react';

import Head from 'next/head';
import Script from 'next/script';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import TagManager from 'react-gtm-module';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';

import { LeadProvider } from '@contexts/lead';
import { StepProvider } from '@contexts/step';

import i18n from '@i18n/setup';

import * as facebookPixel from '@lib/facebookPixel';
import * as googleTag from '@lib/googleTag';

import { recaptchaConfig } from '@models/recaptcha';

import type { LayoutProps } from '@components/Layout';

import { GlobalStyle } from '@styles/globals';
import theme from '@styles/theme';
import { inicializeApp } from '@utils/analytics';

import type { AppProps } from 'next/app';

inicializeApp();

type Props = Exclude<AppProps, 'Component'> & {
  Component: AppProps['Component'] & { Layout?: LayoutProps };
};

// eslint-disable-next-line react/jsx-no-useless-fragment
const Noop: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  const Layout = Component.Layout || Noop;

  React.useEffect(() => {
    facebookPixel.pageView();
    if (process.env.NEXT_PUBLIC_GTM_ID) {
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.png" />
        <title>Example Test | Example</title>

        <meta
          name="facebook-domain-verification"
          content={process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_ID}
        />
      </Head>

      <Script
        id="gtm"
        dangerouslySetInnerHTML={{
          __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer',${process.env.NEXT_PUBLIC_GTM_ID});
            `,
        }}
      />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleTag.TAG_ID}`} />
      <Script
        id="gtag"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `,
        }}
      />

      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', ${facebookPixel.FB_PIXEL_ID});
            `,
        }}
      />
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <LeadProvider>
            <StepProvider>
              <Layout>
                <GoogleReCaptchaProvider
                  reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                  scriptProps={{ ...recaptchaConfig, appendTo: 'head' }}
                >
                  <Component {...pageProps} />
                </GoogleReCaptchaProvider>
              </Layout>
            </StepProvider>
          </LeadProvider>
        </ThemeProvider>
      </I18nextProvider>
    </>
  );
};

export default MyApp;
