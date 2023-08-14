/* eslint-disable import/order */
import React from 'react';

import { useStepContext } from '@contexts/step';

import { COMPLETE_FLOW } from '@hooks/useStep';

import * as S from './Actions.styles';

export type Props = {
  loading?: boolean;
};

export const Actions: React.FC<Props> = ({ loading = false }) => {
  const {
    action: { setPrevious },
    state: { current },
  } = useStepContext();
  return (
    <S.Wrapper>
      <S.ButtonDecline
        disabled={current === COMPLETE_FLOW.FIRST}
        variation="default"
        startIcon="chevron-left-outline"
        onClick={setPrevious}
      >
        Voltar
      </S.ButtonDecline>

      <S.ButtonConfirm
        type="submit"
        variation="alternate"
        endIcon="chevron-right-outline"
        disabled={loading}
        loading={loading}
      >
        Avançar
      </S.ButtonConfirm>
    </S.Wrapper>
  );
};
