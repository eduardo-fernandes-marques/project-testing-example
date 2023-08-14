export type Lead = {
  id: string;
  name: string;
  email: string;
  acceptedPrivacyPolicy: boolean;
  phone: string;
  plan?: string;
  document?: string;
  type?: string;
  store?: Store;
  otp?: string;
  updatedAt: string;
  submitted: boolean;
  acceptedTerms: boolean;
  utmCampaign: string;
  utmMedium: string;
  utmSource: string;
  corporativeName: string;
};

export type Store = {
  name?: string;
  slug?: string;
  template?: string;
  segment?: string;
  revenue?: string;
  platform?: Platform;
  type: string;
};

export type Platform = {
  name: string;
};
