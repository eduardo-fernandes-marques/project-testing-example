/* eslint-disable import/no-cycle */
import React from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { get } from 'lodash';
import { useForm } from 'react-hook-form';

import { useLeadContext } from '@contexts/lead';
import { useStepContext } from '@contexts/step';

import type { Lead } from '@models/lead';
import type { FormProps } from '@pages';

import { Radio } from '@components/inputs';

import { STORE_TYPE } from '@utils/constants';
import { ERROR, VALIDATION } from '@utils/validations';

import { Actions } from '../Actions';
import { Wrapper, WrapperError, WrapperFields } from '../Form.styles';
import * as S from './BusinessCheckpoint.styles';

import type { Props } from '..';

const resolver = Joi.object<Partial<Lead>>({
  store: {
    type: VALIDATION.TEXT,
  },
});

const isWithoutEcommerce = (value?: string) =>
  value === STORE_TYPE.HAS_PHYSICAL_STORE || value === STORE_TYPE.STARTING_FROM_BEGIN;

export const BusinessCheckpoint: React.FC<FormProps> = ({ onSubmit }) => {
  const [lead] = useLeadContext();
  const {
    action: { setNext, setWithoutEcommerceFlow },
  } = useStepContext();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleStoreType = React.useCallback(
    (value: string) => (lead.store?.type === value ? { checked: true } : {}),
    [lead.store?.type]
  );

  const form = useForm<Props>({
    mode: 'onChange',
    defaultValues: lead,
    resolver: joiResolver(resolver, { allowUnknown: true, abortEarly: false }),
  });

  const { control, formState, handleSubmit, setError } = form;

  const errors = React.useMemo(() => get(formState.errors, 'formError')?.message, [formState]);

  const enhanceOnSubmit = React.useCallback(
    async (value: Partial<Lead>) => {
      try {
        setLoading(true);

        await onSubmit(value);

        setLoading(false);

        setWithoutEcommerceFlow(isWithoutEcommerce(value.store?.type));

        setNext();
      } catch (error) {
        setLoading(false);

        setError('formError', { message: ERROR.FORM });
      }
    },
    [onSubmit, setError, setNext, setWithoutEcommerceFlow]
  );

  return (
    <Wrapper onSubmit={handleSubmit(enhanceOnSubmit)}>
      <WrapperFields>
        <S.WrapperRadio>
          <Radio
            control={control}
            label="Tenho e-commerce e loja física"
            name="store.type"
            value={STORE_TYPE.HAS_ECOMMERCE_AND_PHYSICAL_STORE}
            {...handleStoreType(STORE_TYPE.HAS_ECOMMERCE_AND_PHYSICAL_STORE)}
          />
        </S.WrapperRadio>

        <S.WrapperRadio>
          <Radio
            control={control}
            label="Tenho e-commerce"
            name="store.type"
            value={STORE_TYPE.HAS_ECOMMERCE}
            {...handleStoreType(STORE_TYPE.HAS_ECOMMERCE)}
          />
        </S.WrapperRadio>

        <S.WrapperRadio>
          <Radio
            control={control}
            label="Tenho loja física"
            name="store.type"
            value={STORE_TYPE.HAS_PHYSICAL_STORE}
            {...handleStoreType(STORE_TYPE.HAS_PHYSICAL_STORE)}
          />
        </S.WrapperRadio>

        <S.WrapperRadio>
          <Radio
            control={control}
            label="Estou começando do zero"
            name="store.type"
            value={STORE_TYPE.STARTING_FROM_BEGIN}
            {...handleStoreType(STORE_TYPE.STARTING_FROM_BEGIN)}
          />
        </S.WrapperRadio>

        {errors && <WrapperError>{errors}</WrapperError>}
      </WrapperFields>

      <Actions loading={loading} />
    </Wrapper>
  );
};
