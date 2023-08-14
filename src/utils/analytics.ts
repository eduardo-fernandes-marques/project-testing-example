import { logEvent as firebaseLogEvent, getAnalytics } from 'firebase/analytics';
import { getApp, getApps, initializeApp } from 'firebase/app';

import type { Analytics } from 'firebase/analytics';
import type { FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const inicializeApp = () =>
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let analytics: Analytics;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(inicializeApp());
}

export const logEvent = (event: string, value?: Record<string, unknown>) =>
  analytics && firebaseLogEvent(analytics, event, value);
