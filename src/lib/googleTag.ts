export const TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;

export const conversion = () => {
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${TAG_ID}/4p6lCPj0w4AYEM3e8dwD`,
      value: 1.0,
      currency: 'BRL',
    });
  }
};
