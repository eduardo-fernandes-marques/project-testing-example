import React from 'react';

import { get } from 'lodash';

import { useControl } from '@hooks/useControl';
import type { Props as InputProps } from '@hooks/useControl';

import type { Generic } from '@models/flow';

import * as S from './Select.styles';

export type Props = {
  payload: Generic[];
};

export const Select = ({
  control,
  example,
  helpText,
  name,
  payload,
  ...props
}: InputProps & Props) => {
  const { errors, input, show } = useControl({ control, name, helpText, example, ...props });

  const options = React.useMemo(
    () =>
      (payload || []).map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      )),
    [payload]
  );

  return (
    <S.Wrapper>
      {show.example && <S.Example>{example}</S.Example>}

      <S.Select {...input}>{options}</S.Select>

      <S.WrapperFeedback>
        {show.helpText && !get(errors, name) && <S.Helper>{helpText}</S.Helper>}

        {errors && <S.Error>{errors}</S.Error>}
      </S.WrapperFeedback>
    </S.Wrapper>
  );
};
