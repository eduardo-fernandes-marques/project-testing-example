import { memo } from 'react';

import * as S from './Other.styles';

import type { Props } from '..';

const Other: React.FC<Props> = ({ label }) => (
  <S.Wrapper>
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={label}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0V8H8V0H0ZM6 6H2V2H6V6ZM0 10V18H8V10H0ZM6 16H2V12H6V16ZM10 0V8H18V0H10ZM16 6H12V2H16V6ZM10 10V18H18V10H10ZM16 16H12V12H16V16Z"
        fill="#B6B9D0"
      />
    </svg>
    Outra
  </S.Wrapper>
);

export const OtherIcon = memo(Other);
