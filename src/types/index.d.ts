/* eslint-disable @typescript-eslint/no-explicit-any */
export {};
declare global {
  interface Window {
    fbq: (event: string, eventName: string, options?: any) => void;
    gtag: (event: string, eventName: string, options: any) => void;
  }
}
