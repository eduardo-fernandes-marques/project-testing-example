/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');
const withPlugins = require('next-compose-plugins');
const { createSecureHeaders } = require('next-secure-headers');

const isDev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging';

const defaultAllowedAddress = [
  'https://*.google.com/',
  'https://*.licdn.com/',
  'https://*.hellobar.com/',
  'https://*.chimpstatic.com/',
  'https://*.getbutton.io/',
  'https://*.lfeeder.com/',
  'https://chimpstatic.com/',
  'https://*.gaconnector.com/',
  'https://*.linkedin.oribi.io/',
  'https://*.linkedin.com/',
  'https://*.google.com.br/',
  'https://*.adsymptotic.com/',
];

const typekitAddress = ['https://*.typekit.net/'];

const googleAnalyticsAddress = [
  'https://*.google-analytics.com/',
  'http://*.google-analytics.com/',
  'https://*.doubleclick.net/',
  'https://*.google.com/',
  'https://*.googleapis.com',
  'https://*.googletagmanager.com/',
  'https://*.googleadservices.com/',
];

const sentryAddress = ['https://*.sentry.io/'];

const adoptAddress = ['https://*.goadopt.io/', 'http://*.goadopt.io/'];

const recaptcha = ['https://*.gstatic.com/'];

const facebook = ['https://*.facebook.net/', 'https://*.facebook.com/'];

const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  silent: true,
  deploy: {
    env: process.env.SENTRY_ENVIRONMENT,
    name: process.env.SENTRY_RELEASE,
  },
};

const compiler = {
  styledComponents: {
    ssr: true,
  },
};

const moduleExports = {
  compiler,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
  env: {
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  images: {
    domains: ['statics.example.io'],
    deviceSizes: [592, 768, 992, 1440, 2560],
    imageSizes: [18, 32, 48, 68, 72, 128, 256],
  },
  async headers() {
    return !isDev
      ? [
          {
            source: '/(.*)',
            headers: createSecureHeaders({
              contentSecurityPolicy: {
                directives: {
                  defaultSrc: ["'self'", ...defaultAllowedAddress],
                  fontSrc: ["'self'", 'data:', ...defaultAllowedAddress, ...typekitAddress],
                  connectSrc: [
                    "'self'",
                    ...defaultAllowedAddress,
                    ...googleAnalyticsAddress,
                    ...sentryAddress,
                    ...adoptAddress,
                    ...recaptcha,
                    ...facebook,
                  ],
                  scriptSrcElem: [
                    "'self'",
                    "'unsafe-inline'",
                    ...defaultAllowedAddress,
                    ...googleAnalyticsAddress,
                    ...adoptAddress,
                    ...recaptcha,
                    ...facebook,
                  ],
                  scriptSrc: [
                    "'self'",
                    "'unsafe-eval'",
                    "'unsafe-inline'",
                    ...defaultAllowedAddress,
                    ...googleAnalyticsAddress,
                    ...adoptAddress,
                    ...recaptcha,
                    ...facebook,
                  ],
                  scriptSrcAttr: [
                    "'self'",
                    "'unsafe-inline'",
                    ...defaultAllowedAddress,
                    ...adoptAddress,
                    ...recaptcha,
                    ...facebook,
                    ...googleAnalyticsAddress,
                  ],
                  styleSrc: ["'self'", "'unsafe-inline'", ...defaultAllowedAddress],
                  imgSrc: [
                    "'self'",
                    'data:',
                    ...defaultAllowedAddress,
                    ...googleAnalyticsAddress,
                    ...facebook,
                  ],
                  frameSrc: ["'self'", ...defaultAllowedAddress],
                  frameAncestors: ["'self'", ...defaultAllowedAddress],
                  baseURI: ["'self'", ...defaultAllowedAddress],
                  formAction: ["'self'", ...defaultAllowedAddress],
                },
              },
              forceHTTPSRedirect: [true, { maxAge: 15768000, includeSubDomains: true }],
              referrerPolicy: 'same-origin',
              frameGuard: 'sameorigin',
            }),
          },
        ]
      : [];
  },
};

module.exports = isDev
  ? moduleExports
  : withPlugins([withSentryConfig(moduleExports, sentryWebpackPluginOptions)]);
