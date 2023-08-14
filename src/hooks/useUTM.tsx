/* eslint-disable camelcase */
import { useRouter } from 'next/router';

type Query = {
  query: { utm_campaign: string; utm_medium: string; utm_source: string };
};

type UTM = {
  utmCampaign: string;
  utmMedium: string;
  utmSource: string;
};
export const useUTM = (): [React.ReactNode, UTM] => {
  const {
    query: { utm_campaign, utm_medium, utm_source },
  } = useRouter() as unknown as Query;

  return [
    <>
      <input type="hidden" name="utm_campaign" value={utm_campaign} />
      <input type="hidden" name="utm_medium" value={utm_medium} />
      <input type="hidden" name="utm_source" value={utm_source} />
    </>,
    { utmCampaign: utm_campaign, utmMedium: utm_medium, utmSource: utm_source },
  ];
};
