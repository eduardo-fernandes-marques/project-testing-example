import 'styled-components';
import type { Theme } from '@styles/theme';

import type { CSSProp } from 'styled-components';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
  export interface Attributes {
    css?: CSSProp<Theme>;
  }
}
