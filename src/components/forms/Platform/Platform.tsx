/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { get } from 'lodash';
import { useForm } from 'react-hook-form';

import { useLeadContext } from '@contexts/lead';
import { useStepContext } from '@contexts/step';

import type { FormProps } from '@pages';

import { Platforms } from '@components/Platforms';

import { ERROR, VALIDATION } from '@utils/validations';

import { Actions } from '../Actions';
import * as S from '../Form.styles';

import type { Props as Payload } from '..';

export type Props = Pick<FormProps, 'onSubmit' | 'platforms'>;

const resolver = Joi.object<Payload>({
  store: Joi.object({
    platform: Joi.object({
      name: VALIDATION.TEXT,
    }),
  }),
});

export const Platform: React.FC<Props> = ({ onSubmit, platforms }) => {
  const [lead] = useLeadContext();
  const {
    action: { setNext },
  } = useStepContext();

  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm<Payload>({
    mode: 'onChange',
    defaultValues: lead,
    resolver: joiResolver(resolver, { allowUnknown: true, abortEarly: false }),
  });

  const { control, formState, handleSubmit, setError } = form;

  const errors = React.useMemo(
    () =>
      get(formState.errors, 'store.platform.name')?.message ||
      get(formState.errors, 'formError')?.message,
    [formState]
  );

  const enhanceOnSubmit = React.useCallback(
    async (value: Payload) => {
      try {
        setLoading(true);

        await onSubmit(value);

        setLoading(false);

        setNext();
      } catch (error) {
        setLoading(false);

        setError('formError', { message: ERROR.FORM });
      }
    },
    [onSubmit, setError, setNext]
  );

  return (
    <S.Wrapper onSubmit={handleSubmit(enhanceOnSubmit)}>
      <S.WrapperFields>
        <Platforms
          control={control}
          payload={platforms}
          name="store.platform.name"
          defaultValue={lead.store?.platform?.name}
        />

        {errors && <S.WrapperError>{errors}</S.WrapperError>}
      </S.WrapperFields>

      <Actions loading={loading} />
    </S.Wrapper>
  );
};
