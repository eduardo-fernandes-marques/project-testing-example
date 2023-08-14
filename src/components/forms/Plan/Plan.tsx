/* eslint-disable import/no-cycle */
import React from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import Joi from 'joi';
import { get } from 'lodash';
import { useForm } from 'react-hook-form';

import { useLeadContext } from '@contexts/lead';
import { useStepContext } from '@contexts/step';

import type { Lead } from '@models/lead';
import type { FormProps } from '@pages';

import { Contract } from '@components/Contract';
import { Plans } from '@components/Plans';

import { ENDPOINT } from '@utils/constants';
import { ERROR, VALIDATION } from '@utils/validations';

import { Actions } from '../Actions';
import { Wrapper, WrapperError } from '../Form.styles';
import * as S from './Plan.styles';

import type { Props as Payload } from '..';

const resolver = Joi.object<Payload>({
  plan: VALIDATION.TEXT,
  acceptedTerms: VALIDATION.BOOLEAN,
});

export type Props = Pick<FormProps, 'onSubmit' | 'plans'>;

export const Plan: React.FC<Props> = ({ onSubmit, plans }) => {
  const [lead] = useLeadContext();
  const {
    action: { setNext },
  } = useStepContext();

  const form = useForm<Payload>({
    mode: 'onChange',
    defaultValues: lead,
    resolver: joiResolver(resolver, { allowUnknown: true, abortEarly: false }),
  });

  const { control, formState, handleSubmit, setError } = form;

  const errors = React.useMemo(
    () => get(formState.errors, 'plan')?.message || get(formState.errors, 'formError')?.message,
    [formState]
  );

  const enhanceOnSubmit = React.useCallback(
    async (value: Partial<Lead>) => {
      try {
        await onSubmit(value);

        if (lead.id) axios.post<void>(ENDPOINT.LEAD.SUBMIT(lead.id));

        setNext();
      } catch (error) {
        setError('formError', { message: ERROR.FORM });
      }
    },
    [lead.id, onSubmit, setError, setNext]
  );

  return (
    <Wrapper onSubmit={handleSubmit(enhanceOnSubmit)}>
      <S.WrapperFields>
        <Plans control={control} payload={plans} name="plan" defaultValue={lead.plan} />

        {errors && <WrapperError aria-label="error-plan">{errors}</WrapperError>}

        <Contract defaultValue={lead.acceptedTerms} control={control} name="acceptedTerms" />
      </S.WrapperFields>

      <Actions />
    </Wrapper>
  );
};
