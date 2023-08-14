import * as Sentry from '@sentry/nextjs';
import { AxiosError } from 'axios';
// import { NextPageContext } from 'next';

export const requestErrorHandler = (error: AxiosError /* ctx?: NextPageContext*/) => {
  const { status } = error?.response || {};
  const UNAUTHORIZED = status === 401;

  if (UNAUTHORIZED) {
    // Shops's authentication flow logic
  } else {
    Sentry.captureException(error);
  }
};
