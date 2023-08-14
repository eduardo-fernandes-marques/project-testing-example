import React from 'react';

import type { Plan } from '@models/flow';

import type { Props as FormProps } from '@components/forms';
import { CustomRadio } from '@components/inputs/Radio';

import * as S from './Plans.styles';

import type { UseControllerProps } from 'react-hook-form';

export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  payload?: Plan[];
} & UseControllerProps<FormProps>;

export const Plans: React.FC<Props> = ({ defaultValue, onChange, payload, ...props }) => {
  const [state, setState] = React.useState<string>(defaultValue as string);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);

    setState(event.target.value);
  };

  return (
    <S.Wrapper>
      {payload?.map(({ detail, disabled, label, options, value }) => (
        <CustomRadio
          {...props}
          {...{ label, value, options, detail, disabled }}
          value={value}
          key={value}
          onChange={handleChange}
          checked={state === value}
        />
      ))}
    </S.Wrapper>
  );
};
