/* eslint-disable import/no-cycle */
import React from 'react';

import { get } from 'lodash';
import { useForm } from 'react-hook-form';

import { useLeadContext } from '@contexts/lead';
import { useStepContext } from '@contexts/step';

import type { FormProps } from '@pages';

import { Templates } from '@components/Templates';

import { ERROR } from '@utils/validations';

import { Actions } from '../Actions';
import * as S from '../Form.styles';

import type { Props as Payload } from '..';

export type Props = Pick<FormProps, 'onSubmit' | 'templates'>;

export const Template: React.FC<Props> = ({ onSubmit, templates }) => {
  const [lead] = useLeadContext();
  const {
    action: { setNext },
  } = useStepContext();

  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm<Payload>({
    mode: 'onChange',
    defaultValues: lead,
  });

  const { formState, handleSubmit, setError, setValue } = form;

  const errors = React.useMemo(
    () =>
      get(formState.errors, 'store.template')?.message ||
      get(formState.errors, 'formError')?.message,
    [formState]
  );

  const handleChange = React.useCallback(
    (template: string) => {
      setValue('store.template', template);
    },
    [setValue]
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
        <Templates
          payload={templates}
          onChange={handleChange}
          defaultValue={lead.store?.template}
        />

        {errors && <S.WrapperError>{errors}</S.WrapperError>}
      </S.WrapperFields>

      <Actions loading={loading} />
    </S.Wrapper>
  );
};
