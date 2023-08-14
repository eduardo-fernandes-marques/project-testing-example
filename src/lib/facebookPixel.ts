export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageView = () => {
  window.fbq('track', 'PageView');
};

export type StepViewOptions = {
  pagePath: number;
  pageTitle: string;
};

export const stepView = (options?: StepViewOptions) => {
  if (window.fbq) window.fbq('track', 'StepView', options);
};

export const purchase = () => {
  if (window.fbq)
    window.fbq('track', 'Purchase', {
      currency: 'BRL',
      value: 1.0,
    });
};
