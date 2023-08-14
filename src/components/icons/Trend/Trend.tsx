import React, { memo } from 'react';

import type { Props } from '..';

const Trend: React.FC<Props> = ({ label }) => (
  <svg
    width="20"
    height="13"
    viewBox="0 0 20 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label={label}
  >
    <path
      d="M17.71 4.21L20 6.5V0.5H14L16.29 2.79L12.12 6.96C11.73 7.35 11.1 7.35 10.71 6.96L9.54 5.79C8.37 4.62 6.47 4.62 5.3 5.79L0 11.09L1.41 12.5L6.7 7.21C7.09 6.82 7.72 6.82 8.11 7.21L9.28 8.38C10.45 9.55 12.35 9.55 13.52 8.38L17.71 4.21Z"
      fill="#B6B9D0"
    />
  </svg>
);

export const TrendIcon = memo(Trend);
