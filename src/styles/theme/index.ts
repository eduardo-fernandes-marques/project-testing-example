import { breakpoints } from './breakpoints';

import type { BreakpointsProps } from './breakpoints';

export type Theme = {
  breakpoints: BreakpointsProps;
};

const theme: Theme = {
  breakpoints,
};

export default theme;
