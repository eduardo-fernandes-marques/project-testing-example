import React from 'react';

import { get } from 'lodash';

import { useControl } from '@hooks/useControl';
import type { Props } from '@hooks/useControl';

import * as S from './Radio.styles';

export const Radio = ({ checked, control, helpText, name, ...props }: Props) => {
  const { errors, input } = useControl({ control, name, helpText, ...props });

  return (
    <S.Wrapper>
      <input type="radio" {...input} {...(checked && { defaultChecked: checked })} />

      <S.WrapperFeedback>
        {helpText && !get(errors, name) && <S.Helper>{helpText}</S.Helper>}

        {errors && <S.Error>{errors}</S.Error>}
      </S.WrapperFeedback>
    </S.Wrapper>
  );
};
