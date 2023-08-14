import React from 'react';

import Image from 'next/image';

import { useStepContext } from '@contexts/step';

import { IMAGE_HOST } from '@utils/constants';

import * as S from './Jumbotron.styles';

type Props = {
  name: string;
  steps: number[];
  placeholder: string;
};

const images: Props[] = [
  {
    name: 'two-woman-in-computer',
    placeholder:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGP4/+V2dZiNlzKjOgMDw/0ds2fmhQdZ63ibqzFs6cr9f+/ElsVTIuxUATqPEFgwj62BAAAAAElFTkSuQmCC',
    steps: [1],
  },
  {
    name: 'woman-smiling',
    placeholder:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVR4nGP4/+PF0on17nqSPnbaDDVZUaWxnunepm6mKgwRgb7KPAwyDAzRtkoAJ/oLtOsrG9gAAAAASUVORK5CYII=',
    steps: [2, 3, 4],
  },
  {
    name: 'computer-with-coffee',
    placeholder:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGOoLyuwt7Gc3Fpz7fhuBk02BgEGhqy44DsndjDk2CumelpOaSj+//kpABn/D81cJO8vAAAAAElFTkSuQmCC',
    steps: [5, 6, 7, 8],
  },
];

export const Jumbotron: React.FC = () => {
  const {
    state: {
      current: { value },
    },
  } = useStepContext();

  const { blurDataURL, src } = React.useMemo(() => {
    const { name, placeholder } = images.find(({ steps }) => steps.includes(value)) as Props;

    return {
      src: `${IMAGE_HOST}/${name}.png`,
      blurDataURL: placeholder,
    };
  }, [value]);

  return (
    <S.Wrapper>
      <Image
        src={src}
        alt="Jumbotron Image"
        layout="fill"
        placeholder="blur"
        blurDataURL={blurDataURL}
        priority
      />
    </S.Wrapper>
  );
};
