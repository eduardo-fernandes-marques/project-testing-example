export type Platform = { label: string; value: string };

export type Option = { checked: boolean; title: string };

export type Generic = { label: string; value: string };
export type Plan = {
  label: string;
  value: string;
  detail?: string;
  disabled?: boolean;
  options: Option[];
};

export type Template = {
  name: string;
  href: string;
  image: string;
  segment: string;
  badge?: {
    content: string;
    variation: string;
  };
};

export type Resource = {
  platforms: Platform[];
  plans: Plan[];
  templates: Template[];
  segments: Generic[];
  revenues: Generic[];
};
