import styled from 'styled-components';
import { layout, space } from 'styled-system';

export type ImageProps = React.HTMLAttributes<HTMLImageElement>;

export const Image = styled.img<ImageProps>`
  ${layout};
  ${space};

  height: 100%;
  object-fit: fill;
  width: 100%;
`;
