import 'jest-canvas-mock';

import '@testing-library/jest-dom';

import { act, renderHook } from '@testing-library/react';
import dotenv from 'dotenv';
import { useSWRConfig } from 'swr';

import { server } from './server';

dotenv.config();

const originalWindowLocation = window.location;

global.console = {
  ...console,
  error: jest.fn(),
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
};

jest.mock('react-markdown', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

jest.mock('remark-gfm', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

jest.mock('firebase/app', () => {
  return {
    analytics: jest.fn(),
    getApp: jest.fn(),
    getApps: jest.fn(() => []),
    initializeApp: jest.fn(),
  };
});

jest.mock('firebase/analytics', () => {
  return {
    logEvent: jest.fn(),
    getAnalytics: jest.fn(),
  };
});

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  });

  delete (window as Partial<Window>).location;

  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(originalWindowLocation),
      assign: {
        configurable: true,
        value: jest.fn(),
      },
    }
  ) as Location;
});

afterEach(async () => {
  const hook = renderHook(() => useSWRConfig());

  await act(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cache = hook.result.current.cache as Map<string, any>;

    cache.clear();
  });

  await new Promise(requestAnimationFrame);
});

afterAll(() => {
  server.close();

  window.location = originalWindowLocation;
});
