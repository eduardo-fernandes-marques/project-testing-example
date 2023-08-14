/* eslint-disable no-empty-pattern */
import styled from 'styled-components';

const MAX_VISIBILITY = 3;

type WrapperCardProps = {
  absoluteOffset?: number;
  direction?: number;
  offset?: number;
  display: number;
  opacity: number;
} & React.PropsWithChildren;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  height: 368px;
  justify-content: center;
  perspective: 500px;
  position: relative;
  transform-style: preserve-3d;
  width: 60%;
`;

export const WrapperCard = styled.div`
  display: ${({ display }) => (display > MAX_VISIBILITY ? 'none' : 'block')};
  filter: ${({ absoluteOffset }: Partial<WrapperCardProps>) =>
    `blur(calc(${absoluteOffset} * 1rem))`};
  opacity: ${({ opacity }) => (opacity >= MAX_VISIBILITY ? '0' : '1')};
  position: absolute;
  transform: ${({ absoluteOffset, direction, offset }: WrapperCardProps) => `
  rotateY(calc(${offset} * 50deg))
  scaleY(calc(1 + ${absoluteOffset} * -0.4))
  translateZ(calc(${absoluteOffset} * -30rem))
  translateX(calc(${direction} * -5rem))`};
  transition: all 0.3s ease-out;
`;

export const ActionButton = styled.button`
  align-items: center;
  background: white;
  border: 2px solid transparent;
  border-radius: 50%;
  box-shadow: 1px solid black;
  box-shadow: 5px 5px 7px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  height: ${({}) => '8px'};
  position: absolute;
  top: 45%;
  transition: border 0.2s;
  width: ${({}) => '8px'};
  z-index: 2;

  &:hover {
    border-color: ${({}) => 'white'}};
  }

  > div {
    margin: 0;
  }

  &.left {
    left: 0;
    transform: translateX(-100%) translatey(-50%);
  }

  &.right {
    right: 0;
    transform: translateX(100%) translatey(-50%);
  }
`;
