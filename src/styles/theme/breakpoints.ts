/* eslint-disable prefer-destructuring */
export enum BreakpointEnum {
  EXTRA_SMALL = 'extraSmall',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extraLarge',
  DOUBLE_EXTRA_LARGE = 'doubleExtraLarge',
}

export type BreakpointsProps = string[] & {
  extraSmall?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
  doubleExtraLarge?: string;
};

export const breakpoints: BreakpointsProps = [
  '430px',
  '592px',
  '768px',
  '992px',
  '1200px',
  '2560px',
];
breakpoints.extraSmall = breakpoints[0];
breakpoints.small = breakpoints[1];
breakpoints.medium = breakpoints[2];
breakpoints.large = breakpoints[3];
breakpoints.extraLarge = breakpoints[4];
breakpoints.doubleExtraLarge = breakpoints[5];
