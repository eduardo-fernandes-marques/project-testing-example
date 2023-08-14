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

import { Input, Radio, Select } from '@components/inputs';

import { MASK } from '@utils/masks';
import { ERROR, VALIDATION } from '@utils/validations';

import { Actions } from '../Actions';
import { Wrapper, WrapperError, WrapperFields } from '../Form.styles';
import * as S from './Business.styles';

import type { Props as Payload } from '..';

export type Props = Pick<FormProps, 'onSubmit' | 'revenues' | 'segments'>;

const DOCUMENT = {
  VALIDATION,
  MASK,
};

const TYPE = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
};

export const Business: React.FC<Props> = ({ onSubmit, revenues, segments }) => {
  const [lead] = useLeadContext();
  const {
    action: { setNext },
  } = useStepContext();

  const [type, setType] = React.useState<string>(lead.type?.toUpperCase() || TYPE.CNPJ);
  const [loading, setLoading] = React.useState<boolean>(false);

  const resolver = React.useMemo(
    () =>
      Joi.object<Partial<Lead>>({
        document: DOCUMENT.VALIDATION[type as keyof typeof DOCUMENT.VALIDATION],
        store: Joi.object({
          name: VALIDATION.TEXT,
          segment: VALIDATION.TEXT,
          revenue: VALIDATION.TEXT,
        }),
        ...(type === TYPE.CNPJ && { corporativeName: VALIDATION.TEXT }),
      }),
    [type]
  );

  const mask = React.useMemo(() => DOCUMENT.MASK[type as keyof typeof DOCUMENT.MASK], [type]);

  const placeholder = React.useMemo(() => `*${type === TYPE.CPF ? 'Seu' : ''} ${type}`, [type]);

  const form = useForm<Payload>({
    mode: 'onChange',
    defaultValues: lead,
    resolver: joiResolver(resolver, { allowUnknown: true, abortEarly: false }),
  });

  const { control, formState, handleSubmit, setError, setValue } = form;

  const documentExample = React.useMemo(
    () => (type === TYPE.CNPJ ? '00.000.000/0001-00' : '000.000.000-00'),
    [type]
  );
  const errors = React.useMemo(() => get(formState.errors, 'formError')?.message, [formState]);

  const handleOnRadioChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setType(event.target.value.toUpperCase());

      setValue('document', '');
    },
    [setValue]
  );

  const enhanceOnSubmit = React.useCallback(
    async (value: Partial<Lead>) => {
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
    <Wrapper onSubmit={handleSubmit(enhanceOnSubmit)}>
      <WrapperFields>
        <Input
          name="store.name"
          control={control}
          placeholder="*Nome da loja"
          example="Minha marca"
        />

        <S.WrapperRadio>
          <Radio
            name="type"
            label="Pessoa jurídica"
            value="cnpj"
            defaultChecked
            checked={type === TYPE.CNPJ}
            control={control}
            onChange={handleOnRadioChange}
          />

          <Radio
            name="type"
            label="Pessoa física"
            value="cpf"
            control={control}
            checked={type === TYPE.CPF}
            onChange={handleOnRadioChange}
          />
        </S.WrapperRadio>

        <S.WrapperInput>
          <Input
            name="document"
            control={control}
            placeholder={placeholder}
            mask={mask}
            example={documentExample}
          />

          {type === TYPE.CNPJ && (
            <Input
              name="corporativeName"
              control={control}
              placeholder="Razão social"
              example="Minha empresa"
            />
          )}
        </S.WrapperInput>

        <Select name="store.segment" payload={segments} control={control} example="Selecionar" />
        <Select name="store.revenue" payload={revenues} control={control} example="Selecionar" />

        {errors && <WrapperError>{errors}</WrapperError>}
      </WrapperFields>

      <Actions loading={loading} />
    </Wrapper>
  );
};
