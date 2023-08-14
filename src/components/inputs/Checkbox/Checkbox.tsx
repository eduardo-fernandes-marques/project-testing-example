import React from 'react';

import { get } from 'lodash';

import { useControl } from '@hooks/useControl';
import type { Props } from '@hooks/useControl';

import * as S from './Checkbox.styles';

export const Checkbox = ({ checked, control, helpText, name, ...props }: Props) => {
  const { errors, input } = useControl({ control, name, ...props });

  return (
    <S.Wrapper>
      <input type="checkbox" {...input} {...(checked && { defaultChecked: checked })} />

      <S.WrapperFeedback>
        {helpText && !get(errors, name) && <S.Helper>{helpText}</S.Helper>}

        {errors && <S.Error aria-label={`error-checkbox-${name}`}>{errors}</S.Error>}
      </S.WrapperFeedback>
    </S.Wrapper>
  );
};
