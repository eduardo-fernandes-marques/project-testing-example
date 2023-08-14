import React from 'react';

import InputMask from 'react-input-mask';

import { useControl } from '@hooks/useControl';
import type { Props } from '@hooks/useControl';

import * as S from './Input.styles';

export const Input = ({
  control,
  defaultValue = '',
  example,
  helpText,
  mask,
  name,
  ...props
}: Props) => {
  const { errors, input, show } = useControl({
    control,
    name,
    mask,
    defaultValue,
    example,
    helpText,
    ...props,
  });

  return (
    <S.Wrapper>
      {show.example && <S.Example>{example}</S.Example>}

      {mask ? (
        <InputMask {...{ ...input, ref: undefined }}>
          <S.Input {...input} />
        </InputMask>
      ) : (
        <S.Input {...input} />
      )}

      <S.WrapperFeedback>
        {show.helpText && <S.Helper>{helpText}</S.Helper>}

        {errors && <S.Error>{errors}</S.Error>}
      </S.WrapperFeedback>
    </S.Wrapper>
  );
};
